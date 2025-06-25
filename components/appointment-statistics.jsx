"use client";
import { createContext } from "react";

export const StatisticsContext = createContext();

export default function AppointmentStatistics({ children }) {
  return <StatisticsContext.Provider>{children}</StatisticsContext.Provider>;
}
