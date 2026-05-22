import type { Metadata } from "next";
import { PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Blog | Magnus",
  description: "Field notes from building Magnus: protocol design, infrastructure, and emerging-market payments.",
  alternates: { canonical: "https://magnus.foundation/blog" },
};

export default function BlogPage() {
  return (
    <PageShell num="00" label="Notes" title="Blog">
      <Section heading="No posts yet">
        <p>
          The first set of write-ups is being drafted. They will cover Magnus
          architecture, the gas layer, multi-currency settlement, and what we have
          learned operating the Staccato devnet.
        </p>
        <p>
          To get notified when the first post lands, follow{" "}
          <a className="text-brand hover:underline" href="https://x.com/magnus_chain">
            @magnus_chain
          </a>{" "}
          on X.
        </p>
      </Section>
    </PageShell>
  );
}
