import { SectionLabel } from "@/components/sections/SectionLabel";

export function PageShell({
  num,
  label,
  title,
  meta,
  children,
}: {
  num: string;
  label: string;
  title: string;
  meta?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-3xl px-6 md:px-16 mx-auto py-24 md:py-32">
      <SectionLabel num={num} label={label} />
      <h1 className="font-sans text-3xl md:text-4xl font-semibold tracking-tight mb-3">
        {title}
      </h1>
      {meta && (
        <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-12">
          {meta}
        </p>
      )}
      <div className={meta ? "" : "mt-8"}>{children}</div>
    </div>
  );
}

export function Section({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
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

export function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="font-mono text-[11px] tracking-widest uppercase text-brand mt-6 mb-2">
      {children}
    </h3>
  );
}
