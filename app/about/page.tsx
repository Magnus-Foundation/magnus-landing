import type { Metadata } from "next";
import { PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About | Magnus",
  description:
    "Magnus is an EVM Layer 1 for stablecoin payments in emerging markets. Built by Magnus Labs Inc.",
  alternates: { canonical: "https://magnus.foundation/about" },
};

export default function AboutPage() {
  return (
    <PageShell num="00" label="Company" title="About Magnus">
      <Section heading="The thesis">
        <p>
          Stablecoins are the fastest-growing piece of crypto, but the rails they run
          on were not designed for them. Gas tokens are volatile. Bridging is brittle.
          On-ramps are bolted on as an afterthought. For a user in Hanoi or Lagos who
          just wants to send dollars to a friend, the experience is closer to ten
          steps than one.
        </p>
        <p>
          Magnus is an EVM-compatible Layer 1 designed around that user. Gas is paid
          in stablecoins. Local payment rails (VietQR, M-Pesa, GCash, UPI, PIX) are
          first-class. Multi-currency settlement is native, not synthetic.
        </p>
      </Section>

      <Section heading="What we are building">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Gas Layer.</strong> Pay transaction fees in mUSD, mVND, mEUR,
            USDT, USDC, or any MIP-20 token. Conversion happens in protocol.
          </li>
          <li>
            <strong>Gateway.</strong> On-ramp and off-ramp directly into local
            payment systems, without third-party PSP detours.
          </li>
          <li>
            <strong>Netting Engine.</strong> Settle cross-currency flows efficiently
            so liquidity providers are not stranded across pairs.
          </li>
          <li>
            <strong>EVM Runtime.</strong> A parallel-execution EVM so the chain
            scales with the payment volume of a real economy, not a testnet.
          </li>
        </ul>
      </Section>

      <Section heading="The team">
        <p>
          Magnus Labs Inc. is led by Dzung Nguyen, who has spent six years building
          high-performance blockchain payment systems: HotStuff, CometBFT, reth, and
          BLS-based validator infrastructure. The team is small, technical, and
          remote-first, headquartered in Hanoi.
        </p>
        <p>
          We are not a Tempo fork or a fork of any other chain. Magnus is an
          independent L1 designed from the ground up for the workload we care about.
        </p>
      </Section>

      <Section heading="Where to find us">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Email:{" "}
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
            GitHub:{" "}
            <a className="text-brand hover:underline" href="https://github.com/Magnus-Foundation">
              github.com/Magnus-Foundation
            </a>
          </li>
          <li>
            Docs:{" "}
            <a className="text-brand hover:underline" href="https://docs.magnus.foundation">
              docs.magnus.foundation
            </a>
          </li>
        </ul>
      </Section>
    </PageShell>
  );
}
