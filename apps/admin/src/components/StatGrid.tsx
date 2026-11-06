export function StatGrid({
  items,
}: {
  items: { label: string; value: string | number }[];
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 12,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: 16,
            padding: 16,
          }}
        >
          <div style={{ color: "var(--muted)", fontSize: 13 }}>{item.label}</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 8 }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}
