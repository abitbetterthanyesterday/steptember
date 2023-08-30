"use client";
import { StarIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
export const Title = () => {
  return (
    <div className="relative mt-4">
      <motion.h1
        className="text-4xl md:text-6xl text-white flex uppercase flex justify-center items-center p-8 tracking-wide font-display relative z-20"
        initial={{ height: "100vh" }}
        animate={{ height: "auto" }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="text-pink-500 mr-2"
          animate={{ rotate: 360 }}
          initial={{ rotate: 0 }}
          transition={{ repeat: Infinity, type: "linear", duration: 10 }}
        >
          <StarIcon height="2rem" />
        </motion.div>
        <motion.div initial={{ x: 10 }} animate={{ x: 0 }}>
          S
        </motion.div>
        <motion.div
          className="text-pink-500 rotate-6 px-1 "
          initial={{ y: -50, opacity: 0, scale: 1 }}
          animate={{ y: 0, opacity: 1, scale: 1.2 }}
          transition={{ delay: 0.5 }}
        >
          T
        </motion.div>
        <motion.div initial={{ x: -10 }} animate={{ x: 0 }}>
          eptember
        </motion.div>
        <motion.div
          className="text-pink-500 ml-2"
          animate={{ rotate: 270 }}
          initial={{ rotate: -90 }}
          transition={{ repeat: Infinity, type: "linear", duration: 10 }}
        >
          <StarIcon height="2rem" />
        </motion.div>
      </motion.h1>
      <motion.h2
        className="text-2xl text-pink-500 opacity-80 font-display tracking-wider absolute right-4 md:right-0 top-0 z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: 10 }}
        transition={{ delay: 3, type: "spring" }}
      >
        2023
      </motion.h2>
    </div>
  );
};
