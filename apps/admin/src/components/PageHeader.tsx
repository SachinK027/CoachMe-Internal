export function PageHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>{title}</h1>
      {description ? (
        <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{description}</p>
      ) : null}
    </div>
  );
}
