export const metadata = {
  title: "Request access to restricted evidence",
  description:
    "Public SAGE evidence is open to everyone. Detailed material is shared only with approved parties under a non-disclosure agreement.",
  alternates: { canonical: "/request-access/" },
};

// Set at build time on the host (no secrets: it is a public URL). Unset = the page
// explains that requests are not open yet and shows no link.
const gateUrl = process.env.NEXT_PUBLIC_ACCESS_GATE_URL || "";
const gateIsSafe = /^https:\/\/[a-z0-9.-]+(\/[\w./-]*)?$/i.test(gateUrl);

export default function RequestAccessPage() {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href="/">SAGE SUITE</a>
        <a href="/evidence/">Public evidence</a>
      </header>
      <article className="legal-content">
        <div className="section-kicker">Restricted evidence · by request</div>
        <h1>Public by default.<br />Detail by agreement.</h1>
        <p className="legal-lead">
          Everything on this site is public and reviewed for release. Further technical
          detail is available to approved parties who accept a non-disclosure agreement.
        </p>
        <h2>How access works</h2>
        <ol>
          <li>Open the request form on the separate access service and give your name, work email, organization, and why you want access.</li>
          <li>Read and accept the non-disclosure agreement shown there. It is a binding agreement.</li>
          <li>A person reviews every request by hand. Approval is never automatic.</li>
          <li>If approved, you receive a private link that expires and is personalized to you. Do not share it.</li>
        </ol>
        <p>
          Restricted material is not hosted on this site and is not part of this
          repository. This site never collects your details; the access service does, and
          stores them privately.
        </p>
        {gateIsSafe ? (
          <a className="button button-primary" href={gateUrl} rel="noopener noreferrer">
            Go to the access request form
          </a>
        ) : (
          <p><strong>Access requests are not open yet.</strong> Check back soon.</p>
        )}
        <p>
          Evidence on this site remains labelled <strong>SIMULATED</strong> where it is
          simulated. Access to restricted material does not change that, and it is not a
          measured customer result, certification, or evidence of machine safety.
        </p>
      </article>
    </main>
  );
}
