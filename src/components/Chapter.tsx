export function Chapter({
  number,
  label,
  title,
}: {
  number: string;
  label: string;
  title: string;
}) {
  return (
    <div className="chapter-heading">
      <div className="chapter-label mono">
        <span>{number}</span> / {label}
      </div>
      <h2>{title}</h2>
    </div>
  );
}
