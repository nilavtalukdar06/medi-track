"use client";
import Image from "next/image";
import { motion } from "motion/react";

export default function AppointmentForm() {
  return (
    <article className="max-w-md p-4 my-8 mx-auto">
      <motion.div
        className="w-full flex justify-center items-center gap-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 100 }}
        transition={{ duration: 2 }}
      >
        <Image src="/logo.svg" height={36} width={36} alt="logo image" />
        <h2 className="text-2xl font-bold text-gray-600">Medi Track</h2>
      </motion.div>
    </article>
  );
}
