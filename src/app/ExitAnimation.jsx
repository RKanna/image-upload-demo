"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ExitAnimation = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="flex flex-col gap-[10px] items-center">
      <AnimatePresence>
        {visible && (
          <motion.div
            className="w-[100px] h-[100px] bg-blue-400"
            inital={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: -100 }}
            exit={{ opacity: 0, x: -150 }}
            transition={{ duration: "1" }}
          ></motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setVisible(!visible)}
        className="pt-[12px] pl-[18px]"
      >
        {visible ? "Remove Cube" : "Add Box"}
      </button>
    </div>
  );
};

export default ExitAnimation;
