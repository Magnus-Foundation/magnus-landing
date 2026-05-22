import type { Metadata } from "next";
import { SectionLabel } from "@/components/sections/SectionLabel";

export const metadata: Metadata = {
  title: "Privacy Policy — Magnus",
  description:
    "How Magnus Labs Inc. handles personal information across the Magnus Pay mobile wallet, the Magnus website, and related developer services.",
  alternates: { canonical: "https://magnus.foundation/privacy" },
};

const EFFECTIVE_DATE = "May 22, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-3xl px-6 md:px-16 mx-auto py-24 md:py-32">
      <SectionLabel num="00" label="Legal" />

      <h1 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        Privacy Policy
      </h1>
      <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-12">
        Effective {EFFECTIVE_DATE} · Magnus Labs Inc.
      </p>

      <Section heading="1. Who we are">
        <p>
          Magnus Labs Inc. (&ldquo;Magnus&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates the
          Magnus blockchain network, the Magnus Pay mobile wallet (Apple App Store /
          Google Play package <code className="text-brand">xyz.magnuschain.wallet</code>),
          the website at <a className="text-brand hover:underline" href="https://magnus.foundation">magnus.foundation</a>,
          and developer tooling at <a className="text-brand hover:underline" href="https://docs.magnus.foundation">docs.magnus.foundation</a>.
        </p>
        <p>
          This policy explains what information we collect, why we collect it, how we
          use it, and the choices you have. We can be reached at{" "}
          <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
            info@magnus.foundation
          </a>
          .
        </p>
      </Section>

      <Section heading="2. Information we collect">
        <SubHeading>2.1 Information you provide</SubHeading>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Account credentials.</strong> When you sign in to Magnus Pay we use
            Auth0 to authenticate you. The email address and authentication identifiers
            associated with your sign-in (Google, Apple, or email link) are processed
            by Auth0 under their data processing terms.
          </li>
          <li>
            <strong>Profile information.</strong> Optional display name and profile
            picture you choose to upload.
          </li>
          <li>
            <strong>Support correspondence.</strong> Messages you send to us at{" "}
            <code className="text-brand">info@magnus.foundation</code>.
          </li>
        </ul>

        <SubHeading>2.2 Information generated on your device</SubHeading>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Wallet keys.</strong> Magnus Pay is a self-custodial wallet. Your
            private keys are generated on your device and stored in the secure
            enclave (iOS Keychain / Android Keystore). We never receive, transmit, or
            store your private keys, mnemonic, or wallet password.
          </li>
          <li>
            <strong>Local-only data.</strong> Camera frames (used for QR scanning),
            access to contacts (used to suggest payment recipients), photo-library
            entries (saving your payment QR), location data, and biometric prompts
            (Face ID / Touch ID) are processed locally on your device and are not
            sent to Magnus servers.
          </li>
        </ul>

        <SubHeading>2.3 Information collected automatically</SubHeading>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Push notification token.</strong> If you opt into notifications,
            Firebase Cloud Messaging issues a device token that we use to deliver
            transaction alerts. The token is stored against your Magnus account.
          </li>
          <li>
            <strong>Crash and error diagnostics.</strong> When enabled by the
            developer build, anonymized crash and error reports are sent to Sentry
            so we can fix bugs. Reports include device model, OS version, app
            version, stack trace, and a non-identifying installation ID.
          </li>
          <li>
            <strong>On-chain activity.</strong> Transactions you submit through
            Magnus Pay are broadcast to the Magnus blockchain. Like every public
            blockchain, this data is permanent and publicly viewable; it is not a
            disclosure controlled by Magnus Labs.
          </li>
          <li>
            <strong>Website logs.</strong> magnus.foundation and docs.magnus.foundation
            are served from Cloudflare; standard request logs (IP address, user
            agent, referer, timestamp) are retained for security and abuse-prevention.
          </li>
        </ul>

        <SubHeading>2.4 What we do not do</SubHeading>
        <ul className="list-disc pl-6 space-y-2">
          <li>We do not sell your personal information.</li>
          <li>We do not use third-party advertising SDKs, ad attribution SDKs (AppsFlyer / Adjust / SKAdNetwork), or behavioral advertising trackers.</li>
          <li>We do not track activity across apps or websites for advertising.</li>
        </ul>
      </Section>

      <Section heading="3. How we use information">
        <ul className="list-disc pl-6 space-y-2">
          <li>To create your account and let you sign in.</li>
          <li>To deliver transaction notifications you have opted into.</li>
          <li>To diagnose crashes, prevent fraud, and keep the service secure.</li>
          <li>To respond to your support requests.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
        <p>
          Our legal bases (where the GDPR or similar law applies) are: performance of
          a contract with you, our legitimate interests in operating a secure service,
          your consent (for optional features like notifications), and compliance with
          legal obligations.
        </p>
      </Section>

      <Section heading="4. Sharing">
        <p>We share information only with the service providers we rely on to run Magnus, and only to the extent each provider needs:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Auth0 (Okta, Inc.)</strong> — authentication.</li>
          <li><strong>Firebase (Google LLC)</strong> — push notifications.</li>
          <li><strong>Sentry (Functional Software, Inc.)</strong> — crash and error reporting.</li>
          <li><strong>Cloudflare, Inc.</strong> — website hosting, DNS, and email routing.</li>
          <li><strong>Apple Inc. and Google LLC</strong> — app distribution.</li>
        </ul>
        <p>
          We may also disclose information when required by law, to protect our rights,
          or in connection with a corporate transaction, subject to confidentiality
          obligations.
        </p>
      </Section>

      <Section heading="5. Data retention">
        <p>
          Account and authentication records are retained while your account is
          active and for up to twelve months after deletion to satisfy
          fraud-prevention and accounting obligations. Crash diagnostics are
          retained for ninety days. Server logs are retained for thirty days.
          On-chain transactions are permanent and outside our control.
        </p>
      </Section>

      <Section heading="6. Your choices and rights">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Access, correction, deletion.</strong> You may request a copy of
            the personal information we hold about you, ask us to correct it, or ask
            us to delete it, subject to legal exceptions. Email{" "}
            <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">info@magnus.foundation</a>.
          </li>
          <li>
            <strong>Account deletion.</strong> You can delete your Magnus Pay account
            from within the app (Settings → Account → Delete account) or by
            emailing us. Deleting your account does not erase on-chain transactions.
          </li>
          <li>
            <strong>Notifications and permissions.</strong> Camera, contacts, photos,
            location, and notification permissions can be revoked at any time in your
            device&rsquo;s OS settings.
          </li>
          <li>
            <strong>EU / UK / California residents.</strong> You have additional
            rights under the GDPR, UK GDPR, and CCPA / CPRA, including the right to
            object, restrict processing, and lodge a complaint with your supervisory
            authority.
          </li>
        </ul>
      </Section>

      <Section heading="7. Children">
        <p>
          Magnus Pay is not directed to children under 13 (or the equivalent minimum
          age in your jurisdiction). We do not knowingly collect personal information
          from children. If you believe a child has provided us with information,
          contact us and we will delete it.
        </p>
      </Section>

      <Section heading="8. International transfers">
        <p>
          Our service providers may process data in the United States and other
          jurisdictions. Where required, we rely on Standard Contractual Clauses or
          equivalent safeguards.
        </p>
      </Section>

      <Section heading="9. Security">
        <p>
          We use TLS in transit, encrypted storage at rest with our providers, and
          device-level secure enclaves for wallet keys. No system is perfectly
          secure; please use a strong device passcode and biometric lock, and never
          share your recovery phrase with anyone, including us.
        </p>
      </Section>

      <Section heading="10. Changes to this policy">
        <p>
          We may update this policy from time to time. Material changes will be
          announced in-app or on this page. The &ldquo;Effective&rdquo; date above shows when
          the current version took effect.
        </p>
      </Section>

      <Section heading="11. Contact">
        <p>
          Magnus Labs Inc.<br />
          Email:{" "}
          <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
            info@magnus.foundation
          </a>
        </p>
      </Section>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-sans text-xl md:text-2xl font-semibold tracking-tight mb-4 text-text-main">
        {heading}
      </h2>
      <div className="font-sans text-sm md:text-[15px] leading-relaxed text-text-muted space-y-4">
        {children}
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] tracking-widest uppercase text-brand mt-6 mb-2">
      {children}
    </h3>
  );
}
