"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { TextAnimate } from "./magicui/text-animate";
import AppointmentForm from "./appointment-form";

export default function AppointmentFormLayout() {
  return (
    <article className="max-w-md p-4 mx-auto">
      <motion.div
        className="w-full flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <Image src="/logo.svg" height={36} width={36} alt="logo image" />
      </motion.div>
      <div className="my-4 flex flex-col justify-center items-center gap-y-4">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="text-xl font-semibold text-gray-600"
        >
          Hey there 👋
        </motion.h2>
        <TextAnimate className="text-sm text-gray-400 tracking-wide leading-snug">
          Request a new appointment in 10 seconds
        </TextAnimate>
      </div>
      <div className="my-6">
        <AppointmentForm />
      </div>
    </article>
  );
}
