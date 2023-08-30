"use client";
import { PlusIcon, StarIcon } from "@heroicons/react/24/outline";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useMeasure } from "@uidotdev/usehooks";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { LoginForm } from "./Login";
import { AddStepForm } from "./AddStepForm";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 90% 90%)`,
    transition: {
      type: "spring",
      stiffness: 200,
      restDelta: 2,
    },
  }),
  closed: (height: number) => ({
    clipPath: `circle(0px at 80% 95%)`,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  }),
};

const overlay = {
  open: (height = 1000) => ({
    opacity: 0.8,
    transition: {
      type: "spring",
      stiffness: 200,
      restDelta: 2,
    },
  }),
  closed: (height: number) => ({
    opacity: 0,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  }),
};

const button = {
  close: {
    rotate: 0,
    transition: {
      type: "spring",
      mass: 2,
      velocity: 2,
    },
  },
  open: {
    rotate: 45,
    transition: {
      velocity: 2,
      mass: 2,
      type: "spring",
    },
  },
};

export const AnimatedSidebar = ({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerRef, { height }] = useMeasure<HTMLDivElement>();
  const supabase = createClientComponentClient();
  const [form, setForm] = useState(
    isAuthenticated ? <AddStepForm /> : <LoginForm />
  );

  useEffect(() => {
    supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        setForm(<AddStepForm />);
      }
      if (event === "SIGNED_OUT") {
        setForm(<LoginForm />);
      }
    });
  }, []);

  return (
    <>
      {isOpen && (
        <motion.div
          className={`bg-indigo-950 opacity-90 grow-1 h-screen absolute ${isOpen ? "z-40" : "-z-40"
            } w-screen top-0`}
          onClick={() => setIsOpen(false)}
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={overlay}
        />
      )}
      <motion.div
        ref={containerRef}
        initial={false}
        className={`right-0 w-screen max-w-[600px] absolute ${isOpen ? "z-50" : "-z-50"
          } h-screen top-0 shrink-0 overflow-hidden`}
        animate={isOpen ? "open" : "closed"}
        custom={height}
      >
        {isOpen && (
          <motion.div>
            <div className="absolute rotate-[25deg] top-[-15%] right-[5%]  z-20 text-pink-400 opacity-40">
              <StarIcon height="300" />
            </div>
            <div className="md:absolute rotate-[25deg] top-[12%] left-[5%]  z-20 text-pink-400 opacity-40 hidden">
              <StarIcon height="200" />
            </div>
            <div className="absolute rotate-[25deg] top-[28%] left-[-32%]  z-20 text-pink-400 opacity-40">
              <StarIcon height="500" />
            </div>
            <div className="absolute rotate-[15deg] bottom-[4%] right-[-55%]  z-20 text-pink-400 opacity-40">
              <StarIcon height="700" />
            </div>
            <div className="md:absolute  -rotate-12 bottom-[-10%] left-[-25%]  z-20 text-pink-400 opacity-40 hidden">
              <StarIcon height="500" />
            </div>
          </motion.div>
        )}
        <motion.div
          variants={sidebar}
          className="absolute inset-0 bg-pink-500"
        />

        <div
          className={`${isOpen ? "h-full w-full" : "h-0 w-0"} overflow-y-auto`}
        >
          {form}
        </div>
      </motion.div>
      <motion.button
        className={`absolute text-pink-100 flex items-center justify-center z-50 bg-pink-500 rounded-full px-8 py-4 text-lg uppercase tracking-widest bottom-12 right-12 ${isOpen ? "" : "border-b-2 shadow"
          } border-pink-700  font-bold flex gap-2`}
        onClick={() => setIsOpen(!isOpen)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        {isOpen && (
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 1 }}>
            Close
          </motion.div>
        )}
        {!isOpen && (
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
            Add Steps
          </motion.div>
        )}
        <motion.div animate={isOpen ? "open" : "closed"} variants={button}>
          <PlusIcon height="22" width="22" />
        </motion.div>
      </motion.button>
    </>
  );
};
