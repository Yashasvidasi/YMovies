"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import corouselindex from "@/constants";
import { motion, useAnimation } from "framer-motion";
import { News_Cycle } from "next/font/google";
import MovieCard from "./moviecard";
import { useInView } from "react-intersection-observer";
import { UserContext } from "./UserContext";

const MovieListFA = (allmovies: any[]) => {
  const controls2 = useAnimation();
  const { favorites } = useContext(UserContext)!;

  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -600, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 600, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex flex-row">
        <motion.div
          onClick={scrollLeft}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.98 }}
          className="absolute hover:cursor-pointer h-52 mt-8 w-16 rounded-r-full bg-opacity-15 hover:bg-opacity-30 flex flex-col justify-center bg-white z-10  px-10"
        >
          <img
            className="self-center mr-5 min-w-16 h-16 opacity-60"
            style={{ filter: "invert(100%)" }}
            src={"/assets/arrowl.png"}
            alt=""
          />
        </motion.div>
        <motion.div
          ref={containerRef}
          animate={controls2}
          className="my-3 w-full h-[27rem] mb-2 flex flex-row  overflow-hidden space-x-5 hover:overflow-x-scroll  scroll-smooth no-scrollbar"
        >
          {favorites
            ? favorites.map((item, index) => (
                <MovieCard key={index} data={item} />
              ))
            : null}
        </motion.div>
        <motion.div
          onClick={scrollRight}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.98 }}
          className="absolute right-0 hover:cursor-pointer h-52 mt-8 w-16 rounded-l-full bg-opacity-15 hover:bg-opacity-30 flex flex-col justify-center bg-white z-10  px-10"
        >
          <img
            className="self-center ml-4 min-w-16 h-16 opacity-60"
            style={{ filter: "invert(100%)" }}
            src={"/assets/arrowr.png"}
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default MovieListFA;
