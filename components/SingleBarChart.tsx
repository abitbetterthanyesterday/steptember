"use client";
import { UserData } from "@/app/types";
import { StarIcon } from "@heroicons/react/24/outline";
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
      <div className="text-white flex-wrap gap-4 px-8 flex justify-evenly py-8 border rounded-xl border-indigo-700">
        {[1, 2, 3, 4, 5].map((team) => (
          <div className="flex  items-center justify-center gap-2 " key={team}>
            <div
              className={`h-8 w-8 rounded-full md:text-md text-sm ${getColor(
                team as UserData["team"]
              )}`}
            />
            <div className="flex flex-col items-center">
              <p className="text-xs text-indigo-400 uppercase tracking-wider font-bold">
                Team {team}
              </p>
              <div className="text-lg">
                {data
                  .filter((user) => user.team === team)
                  .reduce((acc, curr) => acc + curr.steps, 0)
                  .toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1 text-indigo-300 text-sm -mt-4">
        All together, we have done
        <span className="text-pink-500 font-bold">
          {data.reduce((acc, curr) => acc + curr.steps, 0).toLocaleString()}
        </span>{" "}
        steps!
      </div>
      <div className="flex-col flex gap-2">
        <h1 className="flex gap-2 items-center text-indigo-100 tracking-widest self-center uppercase text-sm">
          <StarIcon className="text-pink-500 w-4 h-4" />
          Leaderboard
          <StarIcon className="text-pink-500 w-4 h-4" />
        </h1>
        <div className="h-1 bg-pink-500 w-3/4 self-center mb-2 rounded-full" />
        {data &&
          data.map(({ name, steps, team, days }, i) => (
            <div
              key={name}
              className="flex gap-2 items-center border rounded-xl border-indigo-700 shadow shadow-indigo p-4"
            >
              <div className="whitespace-nowrap text-indigo-300 text-lg pr-2  w-12 shrink-0">{`${i + 1
                }${getOrdinal(i + 1)}`}</div>
              <div className="basis-28 shrink-0 text-pink-100 md:text-xl capitalize text-md tracking-wider flex flex-col">
                {name}
                {days ? (
                  <div className={"flex flex-grow justify-end flex-col"}>
                    {days && (
                      <div className="text-xs white text-indigo-500">
                        {days} days
                      </div>
                    )}
                    {days && (
                      <div className="text-xs text-indigo-500 whitespace-nowrap">
                        {Math.ceil(steps / days).toLocaleString()} steps/day
                      </div>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </div>

              {steps ? (
                <motion.div
                  style={{
                    width: `${(steps / maxSteps) * 100}%`,
                    minWidth: "7ch",
                  }}
                  className={`grow-1 h-8`}
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
                      className="text-indigo-950 text-sm font-bold pr-1"
                      animate={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      transition={{ delay: 6 }}
                    >
                      {steps > 0 && steps.toLocaleString()}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : (
                <></>
              )}
              {/* <div className="shrink-0 text-pink-100">{steps}</div> */}
            </div>
          ))}
      </div>
    </motion.div>
  );
};

function getOrdinal(n: number) {
  let ord = "th";

  if (n % 10 == 1 && n % 100 != 11) {
    ord = "st";
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = "nd";
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = "rd";
  }

  return ord;
}
