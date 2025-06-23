import Loader from "@/components/ui/loading";

export default function Loading() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <Loader />
    </div>
  );
}
