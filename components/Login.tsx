"use client";
import {
  InformationCircleIcon,
  LockClosedIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { motion } from "framer-motion";
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

export const LoginForm = () => {
  const supabase = createClientComponentClient();
  const [status, setStatus] = useState("initial");
  async function handleSubmit(values: { email: string; password: string }) {
    setStatus("saving");
    try {
      let { error, data } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      setStatus("saved");
    } catch (e) {
      console.log(e);
      alert("Failure to login. Please contact Aloys if the problem persists");
    } finally {
      setStatus("initial");
    }
  }

  return (
    <Formik initialValues={{ password: "", email: "" }} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <motion.div
            className="flex flex-col p-8 absolute right-0 z-50 w-full gap-8"
            variants={form}
          >
            <div className="mx-auto flex flex-col gap-8 py-12 px-2 md:px-24">
              <motion.div variants={item}>
                <label className="flex grow-1 text-pink-100 tracking-widest pb-1 text-sm uppercase font-bold">
                  Email
                </label>
                <Field
                  id="steps"
                  name="email"
                  type="email"
                  className="rounded-xl bg-white border-2 border-pink-400 w-full"
                />
              </motion.div>
              <motion.div variants={item}>
                <label className="flex grow-1 text-pink-100 tracking-widest pb-1 text-sm uppercase font-bold">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  className="rounded-xl bg-white border-2 border-pink-300 w-full"
                />
              </motion.div>
              <motion.div variants={item}>
                <button
                  disabled={isSubmitting}
                  className="bg-indigo-800 text-indigo-200 px-6 py-3 rounded-lg uppercase tracking-wider flex flex-nowrap gap-2 text-sm font-semibold overflow-hidden"
                  type="submit"
                >
                  <span className="text-indigo-300">
                    <LockClosedIcon height="20" />
                  </span>
                  {status === "saving"
                    ? "..."
                    : status === "saved"
                      ? "Authenticated!"
                      : "Login"}
                </button>
              </motion.div>

              <motion.div
                className="flex rounded-lg border text-pink-100 border-pink-400 p-8 gap-4 bg-pink-500 opacity-30 justify-center items-center"
                variants={item}
              >
                <InformationCircleIcon height="48" className="text-pink-300" />
                <div className="flex flex-col gap-8 ">
                  <p>
                    If you have difficulty to sign in, please contact Aloys on
                    Slack.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Form>
      )}
    </Formik>
  );
};
