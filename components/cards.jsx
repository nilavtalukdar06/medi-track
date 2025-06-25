import { Calendar, Clock, TriangleAlert } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export default function Cards() {
  return (
    <section className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full place-items-center px-6 py-2">
      {false ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <div className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]">
          <div className="flex gap-x-3 justify-start items-center">
            <Calendar color="#FFD147" />
            <p className="text-2xl font-semibold text-[#FFD147]">94</p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of scheduled appointments
          </p>
        </div>
      )}
      {false ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <div className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]">
          <div className="flex gap-x-3 justify-start items-center">
            <Clock color="#79B5EC" />
            <p className="text-2xl font-semibold text-[#79B5EC]">32</p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of pending appointments
          </p>
        </div>
      )}
      {false ? (
        <Skeleton className="w-full h-[145.587px]" />
      ) : (
        <div className="w-full p-6 border shadow-sm rounded-xl [background:linear-gradient(117.58deg,rgba(215,237,237,0.16)_-47.79%,rgba(204,235,235,0)_100%)]">
          <div className="flex gap-x-3 justify-start items-center">
            <TriangleAlert color="#FF4F4E" />
            <p className="text-2xl font-semibold text-[#FF4F4E]">56</p>
          </div>
          <p className="mt-5 mb-1 text-sm md:text-base text-gray-600">
            Total number of cancelled appointments
          </p>
        </div>
      )}
    </section>
  );
}
