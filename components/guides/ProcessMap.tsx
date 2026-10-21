/** A numbered, connected step-by-step visual. Reads top to bottom on phones, as a path on desktop. */
export function ProcessMap({
  items,
  label,
}: {
  items: { title: string; text: string }[];
  label?: string;
}) {
  return (
    <ol className="pmap" aria-label={label ?? 'Step by step'}>
      {items.map((it, i) => (
        <li key={it.title} className="pmap__step">
          <span className="pmap__n" aria-hidden="true">
            {i + 1}
          </span>
          <span className="pmap__body">
            <strong>{it.title}</strong>
            <span>{it.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
