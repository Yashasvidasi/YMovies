"use client";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import { AppContext } from "../AppContext";
import corouselindex from "@/constants";
import { Poppins } from "next/font/google";

const lato = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const DrawerIndex = ({ setshow }: { setshow: (args0: boolean) => void }) => {
  const { listType, setListType } = useContext(AppContext)!;
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className="absolute bg-slate-500 z-20 mt-12 h-md:h-fit h-32 flex rounded-xl bg-opacity-95 w-fit flex-col justify-start p-2 px-4 ml-0.5 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white scrollbar-corner-transparent"
    >
      {corouselindex.map((item, index) => {
        if (index !== listType - 1)
          return (
            <motion.div
              className="flex w-fit flex-row text-nowrap justify-between h-11 p-2 py-4 hover:cursor-pointer text-lg"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              key={index}
              onClick={() => {
                setshow(false);
                setListType(item.index);
              }}
            >
              <div className="self-center">
                <p className={lato.className}>{item.name}</p>
              </div>
            </motion.div>
          );
      })}
    </motion.div>
  );
};

export default DrawerIndex;
