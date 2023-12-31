"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

type CalendarProps = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  steps: { date: string; steps: number }[];
};

export const Calendar = ({
  selectedDate,
  setSelectedDate,
  steps,
}: CalendarProps) => {
  console.log(selectedDate);
  return (
    <div className="shadow-md border-y-2 border-t-slate-100 border-b-slate-300 shadow-lg shadow rounded-lg overflow-hidden bg-white">
      <div className="grid grid-cols-7 grid-rows-1 gap-2 px-8 py-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div
            className="flex items-center justify-center text-slate-400"
            key={day}
          >
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 gap-2 p-8 pt-2 bg-white">
        <div />
        <div />
        <div />
        <div />
        {new Array(30).fill(null).map((_, i) => {
          const isSelected =
            selectedDate.getTimezoneOffset() > 0
              ? selectedDate.getDate() === i
              : selectedDate.getDate() === i + 1;
          const hasSteps = steps.some(
            ({ date, steps }) =>
              Number(date.split("-")[2]) == i + 1 && steps !== 0
          );
          return (
            <div
              key={i}
              className={`flex items-center justify-center hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500 rounded-full p-0 m-0 aspect-square relative p-4 hover:text-slate-900 hover:font-bold text-indigo-900 transition
cursor-pointer
 ${isSelected ? "font-bold text-indigo-900" : ""}`}
              onClick={() => {
                const selectedDate = new Date(
                  Date.UTC(2023, 8, i + 1, 0, 0, 0)
                );
                setSelectedDate(selectedDate);
              }}
            >
              {hasSteps && (
                <div className="h-2 w-2 absolute top-3 left-[calc(50% - .125rem)] border-b border-indigo-800 rounded-full bg-indigo-500 z-50"></div>
              )}
              {isSelected && (
                <motion.div
                  className={
                    "absolute inset-0 bg-pink-300 z-10 rounded-full shadow-md"
                  }
                  layoutId="indicator"
                  transition={{
                    type: "spring",
                    duration: 0.3,
                  }}
                />
              )}
              <span className={`z-20 `}> {i + 1}</span>
            </div>
          );
        })}
        <div />
      </div>
    </div>
  );
};
