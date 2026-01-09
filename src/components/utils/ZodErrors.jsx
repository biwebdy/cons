export function ZodErrors({ error }) {
  if (!error) return null;
  return error.map((err, index) => (
    <div key={index} className="text-danger small fst-italic mt-1 py-2">
      {err}
    </div>
  ));
}
