import type { Metadata } from "next";
import { PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Terms of Service | Magnus",
  description:
    "Terms of Service governing the Magnus website, the Magnus Pay mobile wallet, and developer services provided by Magnus Labs Inc.",
  alternates: { canonical: "https://magnus.foundation/terms" },
};

const EFFECTIVE_DATE = "May 23, 2026";

export default function TermsPage() {
  return (
    <PageShell
      num="01"
      label="Legal"
      title="Terms of Service"
      meta={`Effective ${EFFECTIVE_DATE} · Magnus Labs Inc.`}
    >
      <Section heading="1. Acceptance of terms">
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the website at
          magnus.foundation, the Magnus Pay mobile wallet, and any other services
          provided by Magnus Labs Inc. (&ldquo;Magnus&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By accessing or
          using any of these services, you agree to these Terms. If you do not
          agree, do not use the services.
        </p>
      </Section>

      <Section heading="2. The services">
        <p>
          Magnus operates a public, EVM-compatible Layer 1 blockchain. The Magnus Pay
          wallet is a self-custodial client application that lets you generate keys
          on your device, sign transactions, and broadcast them to the Magnus
          network. Magnus does not custody your assets, hold your private keys, or
          control your transactions.
        </p>
      </Section>

      <Section heading="3. Eligibility">
        <p>
          You must be at least 18 years old (or the age of majority in your
          jurisdiction) to use the services. You may not use the services if you
          are subject to sanctions imposed by the United States, the European
          Union, the United Kingdom, or other applicable sanctions regimes, or if
          your use would violate the law where you live.
        </p>
      </Section>

      <Section heading="4. Your responsibilities">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You are solely responsible for safeguarding your device, your
            authentication credentials, your private keys, and your recovery
            phrase. If you lose them, we cannot recover your funds.
          </li>
          <li>
            You are responsible for the transactions you sign. On-chain
            transactions are irreversible.
          </li>
          <li>
            You are responsible for paying any taxes, duties, or other government
            charges that apply to your activity on Magnus.
          </li>
          <li>
            You will not use the services to engage in money laundering, terrorist
            financing, fraud, market manipulation, or any other illegal activity.
          </li>
        </ul>
      </Section>

      <Section heading="5. Risks">
        <p>
          Public blockchains are experimental technology. Using Magnus involves
          risks including, without limitation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Loss of access to your wallet if you lose your device and recovery phrase.</li>
          <li>Volatility in the value of any asset, including stablecoins, which can de-peg.</li>
          <li>Bugs, exploits, or unexpected behavior in smart contracts you interact with, including contracts not built by Magnus.</li>
          <li>Network congestion, outages, or downtime that may delay or prevent transactions.</li>
          <li>Regulatory action that may restrict access to the services in your jurisdiction.</li>
        </ul>
        <p>You accept these risks when you use the services.</p>
      </Section>

      <Section heading="6. Third-party services and assets">
        <p>
          Magnus interoperates with third-party services (wallets, dApps, bridges,
          on-ramps, off-ramps, on-chain protocols). We do not control these
          services and are not responsible for them. Your use of any third-party
          service is governed by that service&rsquo;s own terms.
        </p>
      </Section>

      <Section heading="7. Intellectual property">
        <p>
          The Magnus name, logo, and other Magnus marks are owned by Magnus Labs
          Inc. Open-source components of Magnus are licensed under their respective
          open-source licenses (see each repository at{" "}
          <a className="text-brand hover:underline" href="https://github.com/Magnus-Foundation">
            github.com/Magnus-Foundation
          </a>
          ). Nothing in these Terms grants you rights in our trademarks beyond what
          applicable law allows.
        </p>
      </Section>

      <Section heading="8. Disclaimers">
        <p>
          The services are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. To the
          maximum extent permitted by law, Magnus disclaims all warranties,
          express or implied, including merchantability, fitness for a particular
          purpose, non-infringement, and any warranty arising from course of
          dealing or usage of trade. We do not warrant that the services will be
          uninterrupted, error-free, or secure.
        </p>
      </Section>

      <Section heading="9. Limitation of liability">
        <p>
          To the maximum extent permitted by law, Magnus and its affiliates,
          officers, employees, and agents will not be liable for any indirect,
          incidental, special, consequential, or punitive damages, including loss
          of profits, loss of data, or loss of goodwill, arising out of or related
          to your use of the services. Our aggregate liability for direct damages
          will not exceed one hundred United States dollars (USD 100).
        </p>
      </Section>

      <Section heading="10. Indemnity">
        <p>
          You agree to indemnify and hold Magnus harmless from any claim, demand,
          loss, or damage (including reasonable attorneys&rsquo; fees) arising out of
          your use of the services, your violation of these Terms, or your
          violation of any law or the rights of a third party.
        </p>
      </Section>

      <Section heading="11. Changes">
        <p>
          We may update these Terms from time to time. If we make material changes
          we will update the &ldquo;Effective&rdquo; date above and, where appropriate, notify
          you in-app. Your continued use of the services after a change means you
          accept the updated Terms.
        </p>
      </Section>

      <Section heading="12. Termination">
        <p>
          You can stop using the services at any time. We may suspend or terminate
          your access to non-blockchain components of the services (for example,
          the Magnus Pay app login) if you violate these Terms or if required by
          law. Termination does not affect the state of the Magnus blockchain
          itself, which is public and outside our control.
        </p>
      </Section>

      <Section heading="13. Governing law and disputes">
        <p>
          These Terms are governed by the laws of the jurisdiction in which Magnus
          Labs Inc. is incorporated, without regard to conflict-of-law rules. Any
          dispute will be resolved in the courts of that jurisdiction, unless
          applicable consumer-protection law in your country gives you the right
          to bring the dispute in your local courts.
        </p>
      </Section>

      <Section heading="14. Contact">
        <p>
          Magnus Labs Inc.<br />
          Email:{" "}
          <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
            info@magnus.foundation
          </a>
        </p>
      </Section>
    </PageShell>
  );
}
