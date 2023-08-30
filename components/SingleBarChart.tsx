"use client";
import { UserData } from "@/app/types";
import { motion } from "framer-motion";

export const SingleBarChart = ({ data }: { data: UserData[] }) => {
  if (!data) {
    return null;
  }
  const maxSteps = Math.max(...data.map(({ steps }) => steps));
  const getColor = (team: 1 | 2 | 3 | 4 | 5) => {
    switch (team) {
      case 1:
        return "bg-red-500 border-red-700";
      case 2:
        return "bg-yellow-400 border-yellow-700";
      case 3:
        return "bg-pink-500 border-pink-700";
      case 4:
        return "bg-blue-500 border-blue-700";
      case 5:
        return "bg-lime-500 border-lime-700";
    }
  };

  return (
    <motion.div
      className={
        "grid gap-8 mx-auto container px-2 md:py-12 py-4 overflow-hidden"
      }
      initial={{ opacity: 0, y: -10, height: 0 }}
      animate={{ opacity: 1, y: 0, height: "auto" }}
      transition={{ delay: 2.5 }}
    >
      <div className="text-white flex-wrap gap-2 px-8 flex justify-evenly py-8 border rounded-xl border-indigo-800">
        {[1, 2, 3, 4, 5].map((team) => (
          <div className="flex  items-center justify-center gap-2 " key={team}>
            <div
              className={`h-4 w-4 rounded-full md:text-md text-sm ${getColor(
                team as UserData["team"]
              )}`}
            />
            <p>Team {team}</p>
          </div>
        ))}
      </div>
      {data &&
        data.map(({ name, steps, team }) => (
          <div key={name} className="flex gap-2">
            <div className="basis-28 shrink-0 text-pink-100 md:text-xl capitalize text-md tracking-wider">
              {name}
            </div>
            <motion.div
              style={{ width: `${(steps / maxSteps) * 100}%` }}
              className={`grow-1`}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 3, duration: 3 }}
                className={`h-full rounded-full flex items-center justify-end pr-1 md:pr-2 border-b-2 ${getColor(
                  team
                )}
`}
              >
                <motion.div
                  className="text-indigo-950 text-sm font-bold"
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ delay: 6 }}
                >
                  {steps > 0 && steps.toLocaleString()}
                </motion.div>
              </motion.div>
            </motion.div>
            {/* <div className="shrink-0 text-pink-100">{steps}</div> */}
          </div>
        ))}
    </motion.div>
  );
};
