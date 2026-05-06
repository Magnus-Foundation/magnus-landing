export function SectionLabel({ label, num }: { label: string; num: string }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-sm text-text-muted">{num}</span>
      <span className="block w-8 h-px bg-border" />
      <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  );
}
