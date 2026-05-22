import type { Metadata } from "next";
import { PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Security | Magnus",
  description:
    "How to report a security vulnerability in Magnus, and a summary of our security practices.",
  alternates: { canonical: "https://magnus.foundation/security" },
};

export default function SecurityPage() {
  return (
    <PageShell num="02" label="Security" title="Security">
      <Section heading="Reporting a vulnerability">
        <p>
          If you believe you have found a security vulnerability in the Magnus
          blockchain, the Magnus Pay wallet, or any service operated by Magnus
          Labs Inc., please email{" "}
          <a className="text-brand hover:underline" href="mailto:security@magnus.foundation">
            security@magnus.foundation
          </a>
          . We treat all reports as confidential.
        </p>
        <p>
          A good report includes: a clear description of the issue, a proof of
          concept or steps to reproduce, the impact, the affected commit or
          version, and any suggested mitigations. PGP encryption is welcomed; the
          key will be published at <code className="text-brand">/.well-known/security.txt</code>{" "}
          once devnet matures into a stable release.
        </p>
        <p>
          Please do not disclose the issue publicly until we have had a reasonable
          opportunity to investigate and fix it. We will acknowledge your report
          within five business days.
        </p>
      </Section>

      <Section heading="Scope">
        <ul className="list-disc pl-6 space-y-2">
          <li>The Magnus L1 node software and consensus.</li>
          <li>The Magnus Pay mobile wallet.</li>
          <li>Smart contracts in the Magnus Foundation GitHub org.</li>
          <li>Services on <code className="text-brand">magnus.foundation</code>,{" "}
            <code className="text-brand">docs.magnus.foundation</code>, and the
            Staccato devnet endpoints.
          </li>
        </ul>
        <p>
          Out of scope: third-party dApps, third-party bridges, generic web hygiene
          findings on static documentation pages (missing security headers on pages
          that do not handle user data), and reports generated solely by automated
          scanners without a working proof of concept.
        </p>
      </Section>

      <Section heading="Bug bounty">
        <p>
          A formal bug bounty program will launch with mainnet. Until then, valid
          critical reports are eligible for discretionary rewards; severity is
          assessed using the CVSS scoring system and the financial exposure of the
          affected component.
        </p>
      </Section>

      <Section heading="Our security practices">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Self-custodial keys.</strong> Magnus Pay generates wallet keys
            on-device and stores them in the iOS Keychain or Android Keystore.
            Keys never reach our servers.
          </li>
          <li>
            <strong>BLS-signed certificates.</strong> Validator consent on Magnus
            is expressed as aggregated BLS signatures, kept small enough to verify
            cheaply on-chain and off-chain.
          </li>
          <li>
            <strong>Reproducible builds and signed releases.</strong> Public
            releases are tagged in git, with signed artifacts published to the
            corresponding GitHub release.
          </li>
          <li>
            <strong>Dependency hygiene.</strong> We track upstream advisories for
            the Rust, JavaScript, and React Native dependencies we ship.
          </li>
          <li>
            <strong>Crash diagnostics.</strong> Crash and error reports are
            anonymized before reaching Sentry. We do not ingest wallet contents.
          </li>
        </ul>
      </Section>

      <Section heading="Other contacts">
        <p>
          For non-security inquiries, email{" "}
          <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
            info@magnus.foundation
          </a>
          .
        </p>
      </Section>
    </PageShell>
  );
}
