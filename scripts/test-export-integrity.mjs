import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const sourceDirectory = path.resolve("public", "data");
const exportDirectory = path.resolve("out", "data");
const files = fs.readdirSync(sourceDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort();

function verify() {
  const result = spawnSync(process.execPath, ["scripts/verify-static-export.mjs"], {
    encoding: "utf8",
    timeout: 30_000,
  });
  assert.ifError(result.error);
  return result;
}

const baseline = verify();
assert.equal(baseline.status, 0, baseline.stderr || baseline.stdout);
assert.ok(files.length > 0, "Expected reviewed public data downloads");
for (const fileName of files) {
  const exportedPath = path.join(exportDirectory, fileName);
  const sourceBytes = fs.readFileSync(path.join(sourceDirectory, fileName));
  const original = fs.readFileSync(exportedPath);
  assert.ok(original.equals(sourceBytes), `Invalid baseline: ${fileName}`);
  try {
    // Whitespace keeps JSON/CSV content parseable while changing the copy bytes.
    fs.appendFileSync(exportedPath, "\n");
    const result = verify();
    assert.notEqual(result.status, 0, `Verifier accepted a changed export: ${fileName}`);
    assert.ok(
      result.stderr.includes(`Public data export differs from reviewed source: ${fileName}.`),
      `Expected an artifact-specific integrity failure: ${fileName}\n${result.stderr}`,
    );
  } finally {
    fs.writeFileSync(exportedPath, original);
  }
  assert.ok(fs.readFileSync(exportedPath).equals(original), `Export not restored: ${fileName}`);
  assert.ok(fs.readFileSync(path.join(sourceDirectory, fileName)).equals(sourceBytes),
    `Reviewed source changed: ${fileName}`);
}
const restored = verify();
assert.equal(restored.status, 0, restored.stderr || restored.stdout);
console.log(`Export integrity regression passed: ${files.length} altered downloads rejected; original copies restored.`);
