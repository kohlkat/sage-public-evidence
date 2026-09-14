import PilotWorksheet from "./worksheet";

export const metadata = {
  title: "Scope an offline pilot",
  description: "Prepare one bounded machining question, a baseline, and a named reviewer. Download a local SAGE pilot worksheet before agreeing controlled intake.",
  alternates: { canonical: "/pilot/" },
};

export default function PilotPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><a href="/">SAGE SUITE</a><a href="/#pilot">Pilot overview</a></header>
      <article className="legal-content">
        <div className="section-kicker">Offline pilot · scope worksheet</div>
        <h1>One question.<br />A reviewable next step.</h1>
        <p className="legal-lead">Start with the decision your engineer needs to make. Prepare a scope worksheet for an operator-assisted review.</p>
        <p>This page builds a worksheet in your browser. It does not submit an application, upload files, or analyze a machining job. Use nonconfidential descriptions; agree data-use terms and a controlled intake route before sharing production records.</p>
        <PilotWorksheet />
        <h2>What happens after scoping?</h2>
        <ol>
          <li>Agree one question, the current baseline, and a designated reviewer.</li>
          <li>Rehearse the review workflow with an explicitly SIMULATED packet. Keep blocked outcomes and missing evidence visible.</li>
          <li>Record a named decision: stop, repeat offline, or request more evidence.</li>
          <li>Agree a separate protocol before evaluating controlled customer records or considering any physical trial.</li>
        </ol>
        <p>The initial review workflow checks the decision process. It is not a measured customer result or evidence of machine safety. Physical authority remains with qualified people and independent site controls.</p>
        <a className="button" href="mailto:dkohlkat@gmail.com?subject=SAGE%20offline%20pilot">Discuss a scoped pilot</a>
        <p>Send only nonconfidential scope details by email. Do not attach production files.</p>
      </article>
    </main>
  );
}
