import type { Metadata } from "next";
import { PageShell, Section, SubHeading } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Bridge | Magnus",
  description:
    "The Magnus Bridge System (MBS): how value moves between Magnus and other chains, using BLS-cert exchange between validator sets.",
  alternates: { canonical: "https://magnus.foundation/bridge" },
};

export default function BridgePage() {
  return (
    <PageShell num="05" label="Bridge" title="Magnus Bridge System">
      <Section heading="Why we need our own bridge">
        <p>
          A stablecoin chain only matters if value can move on and off of it without
          friction or trust assumptions the user does not understand. Generic bridges
          inherit risk from whichever multisig or relayer set is weakest. We built
          MBS so the security of a transfer between Magnus and a remote chain is
          defined by the validator sets of the two chains, not by a third party.
        </p>
      </Section>

      <Section heading="How MBS works">
        <SubHeading>Validator-set certificates</SubHeading>
        <p>
          Magnus validators sign BLS certificates over outgoing transfer batches.
          A remote chain that wants to accept Magnus value verifies the certificate
          against the Magnus validator set it tracks. The same applies in reverse:
          Magnus tracks the remote validator set and verifies its certificates on
          inbound transfers.
        </p>

        <SubHeading>BLS aggregation</SubHeading>
        <p>
          BLS signatures aggregate cheaply, so a single short signature can attest
          to the consent of the entire active validator set. That keeps proofs small
          enough to verify in an EVM precompile, and avoids the brittleness of
          per-validator signature lists.
        </p>

        <SubHeading>Certificate exchange</SubHeading>
        <p>
          The pattern follows commonware-bridge: each side keeps a running view of
          the other&rsquo;s validator set, updated by light-client style proofs. Transfers
          are then just messages signed under the current set on the source chain
          and verified on the destination chain.
        </p>
      </Section>

      <Section heading="Status">
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Magnus &rarr; remote.</strong> Design complete; reference
            implementation in progress.
          </li>
          <li>
            <strong>Remote &rarr; Magnus.</strong> Design open: we are still settling
            the trust model for tracking validator-set changes of chains whose
            consensus is not BLS-aggregatable.
          </li>
          <li>
            <strong>Mainnet:</strong> not yet live.
          </li>
        </ul>
        <p>
          Until MBS ships, Magnus is reachable from external chains via established
          bridges, and the wallet treats those routes as third-party (they carry the
          security model of whichever bridge is used, not of Magnus).
        </p>
      </Section>

      <Section heading="More">
        <p>
          Protocol reference is in{" "}
          <a className="text-brand hover:underline" href="https://docs.magnus.foundation">
            docs.magnus.foundation
          </a>
          . Source lives under{" "}
          <a className="text-brand hover:underline" href="https://github.com/Magnus-Foundation">
            github.com/Magnus-Foundation
          </a>
          .
        </p>
      </Section>
    </PageShell>
  );
}
