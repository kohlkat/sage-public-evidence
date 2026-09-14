"use client";

import { useState } from "react";
import styles from "./worksheet.module.css";

const fields = [
  ["pilot_name", "Pilot name", 120, "A short name for one bounded review"],
  ["question", "Question to review", 2000, "What decision should the review support?"],
  ["baseline", "Current baseline and constraints", 2000, "Describe the existing planning approach without production details"],
  ["reviewer", "Designated reviewer", 120, "Name or agreed reviewer role"],
  ["data_use_reference", "Data-use approval reference", 500, "Use “pending — scope only” until terms are agreed"],
];

export default function PilotWorksheet() {
  const [message, setMessage] = useState("");
  function download(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const worksheet = { schema_version: "sage-pilot-scope/v1" };
    for (const [key, , max] of fields) {
      const value = String(data.get(key) || "").trim();
      if (!value || value.length > max) {
        setMessage("Complete every field with a nonblank value before downloading.");
        form.elements.namedItem(key).focus();
        return;
      }
      worksheet[key] = value;
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(worksheet, null, 2) + "\n"], { type: "application/json" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "sage-pilot-scope.json";
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Worksheet download requested. Nothing was submitted. Keep the file for your pilot scoping discussion.");
  }
  return (
    <form className={styles.form} onSubmit={download} onReset={() => setMessage("")}>
      <h2>Your pilot scope</h2>
      {fields.map(([key, label, max, hint]) => (
        <div key={key} className={styles.field}>
          <label htmlFor={key}>{label}</label>
          <p id={`${key}-hint`}>{hint}</p>
          {max === 2000
            ? <textarea id={key} name={key} maxLength={max} required rows={3} aria-describedby={`${key}-hint`} />
            : <input id={key} name={key} maxLength={max} required aria-describedby={`${key}-hint`} />}
        </div>
      ))}
      <p className={styles.note}>A reference records a declaration; it does not verify permission. Form values stay on this page until you clear, reload, or leave. Download saves a local JSON file.</p>
      <div className={styles.actions}><button className="button" type="submit">Download scope worksheet</button><button type="reset" className={styles.clear}>Clear form</button></div>
      <p role="status" aria-live="polite" className={styles.status}>{message}</p>
      <noscript>Enable JavaScript to download a worksheet, or use the scoping email link below.</noscript>
    </form>
  );
}
