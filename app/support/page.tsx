import type { Metadata } from "next";
import { PageShell, Section, SubHeading } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Support | Magnus",
  description:
    "Get help with Magnus Pay: contact support, answers to common questions about fees, networks, recovery, and how to reach the team.",
  alternates: { canonical: "https://magnus.foundation/support" },
};

export default function SupportPage() {
  return (
    <PageShell
      num="00"
      label="Support"
      title="Support"
      meta="Magnus Pay · Magnus Labs Inc."
    >
      <Section heading="Get in touch">
        <p>
          For help with the Magnus Pay wallet, email{" "}
          <a className="text-brand hover:underline" href="mailto:support@magnus.foundation">
            support@magnus.foundation
          </a>
          . We read every message and reply within two business days.
        </p>
        <p>
          When you write, it helps to include: your app version (Settings, scroll to
          the bottom), the device you are using, and a short description of what you
          expected versus what happened. Never send your recovery phrase or private
          keys. No one at Magnus will ever ask for them.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Support email:{" "}
            <a className="text-brand hover:underline" href="mailto:support@magnus.foundation">
              support@magnus.foundation
            </a>
          </li>
          <li>
            General inquiries:{" "}
            <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
              info@magnus.foundation
            </a>
          </li>
          <li>
            X:{" "}
            <a className="text-brand hover:underline" href="https://x.com/magnus_chain">
              @magnus_chain
            </a>
          </li>
          <li>
            Documentation:{" "}
            <a className="text-brand hover:underline" href="https://docs.magnus.foundation">
              docs.magnus.foundation
            </a>
          </li>
        </ul>
      </Section>

      <Section heading="Common questions">
        <SubHeading>Why do I pay fees in stablecoins?</SubHeading>
        <p>
          Magnus is a Layer 1 where transaction fees are paid in the stablecoin you
          already hold (mUSD, mVND, mEUR, USDT, USDC, or any registered token). There
          is no separate gas token to buy first. In the Send flow, tap &ldquo;Pay gas
          with&rdquo; and choose the currency you want the fee deducted in.
        </p>

        <SubHeading>Which networks does Magnus Pay support?</SubHeading>
        <p>
          Magnus Pay runs on the Magnus network. It is currently live on the Staccato
          devnet. Balances and transactions you see while on devnet are test values,
          not spendable funds.
        </p>

        <SubHeading>Who controls my funds and keys?</SubHeading>
        <p>
          Magnus Pay is self-custodial. Your recovery phrase is generated and stored on
          your device. Magnus Labs cannot access your wallet, move your funds, or reset
          your phrase. Keep your recovery phrase somewhere safe and offline. If you lose
          it, no one can restore access for you.
        </p>

        <SubHeading>How do I restore my wallet on a new device?</SubHeading>
        <p>
          Install Magnus Pay, choose &ldquo;Restore wallet,&rdquo; and enter your
          recovery phrase. Your balances and history are read from the network, so they
          reappear once the phrase is entered correctly.
        </p>

        <SubHeading>A transaction is stuck or missing. What do I do?</SubHeading>
        <p>
          Open Activity and tap the transaction to see its status and a link to the
          block explorer. If the explorer shows it as confirmed but the wallet does not
          update, close and reopen the app to refresh. If it still looks wrong, email{" "}
          <a className="text-brand hover:underline" href="mailto:support@magnus.foundation">
            support@magnus.foundation
          </a>{" "}
          with the transaction hash.
        </p>

        <SubHeading>How do I get the app?</SubHeading>
        <p>
          Magnus Pay is being prepared for the App Store and Google Play. Until the
          public listing is live, follow{" "}
          <a className="text-brand hover:underline" href="https://x.com/magnus_chain">
            @magnus_chain
          </a>{" "}
          for the release announcement, or email us for access.
        </p>
      </Section>

      <Section heading="Report a security issue">
        <p>
          For anything that affects the safety of funds or accounts, email{" "}
          <a className="text-brand hover:underline" href="mailto:security@magnus.foundation">
            security@magnus.foundation
          </a>{" "}
          and see our{" "}
          <a className="text-brand hover:underline" href="/security">
            security page
          </a>{" "}
          for what to include. Please do not disclose the issue publicly until we have
          had a chance to investigate.
        </p>
      </Section>
    </PageShell>
  );
}
