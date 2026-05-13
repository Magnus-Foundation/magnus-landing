export function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-brand">
        // {num} — {label.toUpperCase()}
      </span>
    </div>
  );
}
