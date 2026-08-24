type BlueprintProps = {
  /** Redovi dijagrama: [labela, vrednost] */
  rows: [string, string][];
};

/** Tamni "blueprint" blok — okidač / izvor / obrada / destinacija. */
export function Blueprint({ rows }: BlueprintProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl bg-ink p-5 font-mono text-sm leading-7 text-bg/85">
      {rows.map(([label, value]) => (
        <div key={label}>
          <span className="font-semibold text-accent">{label}:</span> {value}
        </div>
      ))}
    </div>
  );
}
