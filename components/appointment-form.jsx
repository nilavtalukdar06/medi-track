import Image from "next/image";

export default function AppointmentForm() {
  return (
    <article className="max-w-md p-4 my-12 mx-auto">
      <div className="w-full flex justify-center items-center gap-x-4">
        <Image src="/logo.svg" height={36} width={36} alt="logo image" />
        <h2 className="text-2xl font-bold text-gray-600">Medi Track</h2>
      </div>
    </article>
  );
}
