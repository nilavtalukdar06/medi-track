"use client";
import { createContext, useState } from "react";

export const StatisticsContext = createContext();

export default function AppointmentStatistics({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [scheduledAppointments, setScheduledAppointments] = useState([]);
  const [data, setData] = useState([]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/get-appointments");
      if (!response.ok) {
        throw new Error(`error: ${response.status}, ${response.statusText}`);
      }
      const data = await response.json();
      if (data.length === 0) {
        setData([]);
      } else {
        setData([...data]);
        const cancelled = data.filter((item) => item.status === "cancelled");
        const scheduled = data.filter((item) => item.status === "accepted");
        const pending = data.filter((item) => item.status === "pending");
        setCancelledAppointments([...cancelled]);
        setScheduledAppointments([...scheduled]);
        setPendingAppointments([...pending]);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StatisticsContext.Provider
      value={{
        isLoading,
        data,
        fetchAppointments,
        pendingAppointments,
        cancelledAppointments,
        scheduledAppointments,
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
}
