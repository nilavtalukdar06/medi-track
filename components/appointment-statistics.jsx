"use client";
import { createContext, useState } from "react";

export const StatisticsContext = createContext();

export default function AppointmentStatistics({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/get-appointments");
      if (!response.ok) {
        throw new Error(`error: ${response.status}, ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data);
      if (data.length === 0) {
        setData([]);
      } else {
        setData([...data]);
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StatisticsContext.Provider value={{ isLoading, data, fetchAppointments }}>
      {children}
    </StatisticsContext.Provider>
  );
}
