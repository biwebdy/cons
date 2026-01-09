export function StrapiErrors({ error }) {
  if (!error?.message) return null;
  return (
    <div className="text-danger fs-6 fst-italic py-2">{error.message}</div>
  );
}
