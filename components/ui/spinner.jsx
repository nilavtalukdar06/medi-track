export default function Spinner() {
  return (
    <div
      className="animate-spin inline-block size-4 border-2 border-current border-t-transparent text-white rounded-full"
      role="status"
      aria-label="loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
