import type { Metadata } from "next";
import { PageShell, Section } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Careers | Magnus",
  description: "Open roles at Magnus Labs.",
  alternates: { canonical: "https://magnus.foundation/careers" },
};

export default function CareersPage() {
  return (
    <PageShell num="00" label="Hiring" title="Careers">
      <Section heading="No open roles right now">
        <p>
          Magnus is still a small team. When we open hiring, the roles will be
          listed on this page.
        </p>
        <p>
          If you are working on something adjacent (EVM execution, BLS aggregation,
          mobile wallets, payment rails) and want to compare notes, email{" "}
          <a className="text-brand hover:underline" href="mailto:info@magnus.foundation">
            info@magnus.foundation
          </a>
          .
        </p>
      </Section>
    </PageShell>
  );
}
