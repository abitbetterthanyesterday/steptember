// @ts-nocheck
"use client";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "./Calendar";
import { Formik, Form, Field } from "formik";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const form = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const item = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const rocket = {
  initial: {
    y: [20, 0],
    rotate: [0, 0],
    transition: {
      ease: "easeOut",
    },
  },
  saved: {
    y: [0, 0, -40],
    color: [null, null],
    rotate: [null, null, -45],
    transition: {
      delay: 0.3,
      ease: "easeIn",
    },
  },
  saving: {
    y: [0],
    rotate: [null, -45],
    color: [null, "orange"],
    type: "spring",
    mass: 10,
  },
};

export const AddStepForm = () => {
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState("initial");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [profileId, setProfileId] = useState(null);
  const [name, setName] = useState("");
  const [steps, setSteps] = useState([]);
  const [id, setId] = useState(undefined);
  const [value, setValue] = useState(
    () =>
      steps.find(
        ({ date }) => Number(date.split("-")[2]) == selectedDate.getDate()
      )?.steps ?? 0
  );

  useEffect(() => {
    const value =
      steps.find(
        ({ date }) => Number(date.split("-")[2]) == selectedDate.getDate()
      )?.steps ?? 0;
    const id =
      steps.find(
        ({ date }) => Number(date.split("-")[2]) == selectedDate.getDate()
      )?.id ?? undefined;
    setValue(value);
    setId(id);
  }, []);

  useEffect(() => {
    const value =
      steps.find(
        ({ date }) => Number(date.split("-")[2]) == selectedDate.getDate()
      )?.steps ?? 0;
    const id =
      steps.find(
        ({ date }) => Number(date.split("-")[2]) == selectedDate.getDate()
      )?.id ?? undefined;
    setValue(value);
    setId(id);
  }, [selectedDate]);

  async function handleSubmit() {
    setStatus("saving");
    try {
      let { error, data } = await supabase.from("steps").upsert({
        id,
        steps: Number(value),
        date: selectedDate,
        updated_at: new Date().toISOString(),
        profile_id: profileId,
      });
      if (error) throw error;

      fetchData();
      setStatus("saved");
      await new Promise((r) => setTimeout(r, 2500));
      setId(!id);
    } catch (e) {
      console.log(e);
    } finally {
      setStatus("initial");
    }
  }

  useEffect(() => {
    supabase.auth.getUser().then((u) => {
      setName(u.data.user?.email.split("@")[0].split(".")[0]);
    });
  }, []);

  function fetchData() {
    supabase.auth
      .getUser()
      .then(({ data: { user } }) => {
        if (!user) {
          return;
        }
        supabase
          .from("profiles")
          .select("id")
          .eq("user_id", user.id)
          .then(({ data }) => {
            setProfileId(data[0].id);
            supabase
              .from("steps")
              .select(
                `
    id,
    steps,
    date
    `
              )
              .eq("profile_id", data[0].id)
              .then(({ data }) =>
                setSteps(data as unknown as { steps: number; date: Date })
              );
          });
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => fetchData(), []);

  return (
    <div className={"h-screen overflow-y-auto"}>
      <Formik
        initialValues={{
          steps: value,
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <motion.div
              className="flex flex-col p-8 relative z-20 gap-8 md:gap-12 "
              variants={form}
            >
              <motion.div variants={item}>
                <h1 className="flex justify-center text-4xl text-pink-100 py-12">
                  Hey, <span className="capitalize pl-2">{name}</span>!
                </h1>
              </motion.div>
              <motion.div variants={item}>
                <label className="text-pink-100 text-sm font-bold flex flex-col gap-2 uppercase pb-2">
                  When did you walk?
                </label>
                <Calendar
                  steps={steps}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                />
              </motion.div>
              <motion.div variants={item}>
                <label className="text-pink-100 text-sm font-bold flex flex-col gap-2 uppercase">
                  How many steps did you do?
                  <span className="text-indigo-900">
                    <Field
                      id="steps"
                      name="steps"
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="rounded-xl bg-white border-2 border-pink-300"
                    />
                  </span>
                </label>
              </motion.div>
              <motion.div variants={item}>
                <button
                  disabled={isSubmitting}
                  className="bg-indigo-800 text-indigo-200 px-6 py-3 rounded-lg uppercase tracking-wider flex flex-nowrap gap-2 text-sm font-semibold overflow-hidden"
                  type="submit"
                >
                  <motion.span
                    className="text-indigo-400"
                    variants={rocket}
                    animate={status}
                  >
                    <RocketLaunchIcon height="20" />
                  </motion.span>
                  {status === "saving" ? (
                    "Saving ..."
                  ) : status === "saved" ? (
                    <span className="flex gap-2 whitespace-nowrap nowrap">
                      Nice work!
                    </span>
                  ) : (
                    "Save"
                  )}
                </button>
              </motion.div>
            </motion.div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
