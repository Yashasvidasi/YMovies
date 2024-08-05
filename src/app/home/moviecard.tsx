"use client";
import React, { Component, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { AppContext } from "../AppContext";
import { useRouter } from "next/navigation";

const MovieCard = (props: {
  data: {
    gender: any;
    id: number;
    poster_path: any;
    title: any;
    name: any;
  };
}) => {
  const { setcurrentSelection, setcurrentSelectiontype, listType } =
    useContext(AppContext)!;

  const getmovieortv = () => {
    if (listType % 2 === 0) {
      return "tv";
    } else {
      return "movie";
    }
  };

  const truncatetext = (s: string | undefined) => {
    if (s === undefined) {
      return null;
    }
    if (s.length > 25) {
      return s.slice(0, 24) + "...";
    } else {
      return s;
    }
  };

  const timerRef = React.useRef<number | null>(null);
  const controls = useAnimation();
  const handleMouseEnter = () => {
    controls.start({
      width: ["0", "100%"],
      transition: { duration: 1.3, ease: "easeInOut" },
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      width: "0%",
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  };

  const router = useRouter();

  return (
    <motion.div
      className="relative h-fit m-3 flex flex-col hover:cursor-pointer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        if (props.data.name) {
          if (props.data.gender) {
            router.push(`/person/${props.data.id}`);
          } else {
            router.push(`/tv/${props.data.id}`);
          }
        } else {
          router.push(`/movie/${props.data.id}`);
        }
      }}
      onHoverStart={() => {
        handleMouseEnter();
        timerRef.current = window.setTimeout(() => {
          setcurrentSelection(props.data.id);
          setcurrentSelectiontype(getmovieortv());
        }, 1100);
      }}
      onHoverEnd={() => {
        handleMouseLeave();
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-1 bg-red-500 rounded"
        initial={{ width: 0 }}
        animate={controls}
      />
      <img
        className="border-2 border-white h-52 w-32"
        src={`https://image.tmdb.org/t/p/w500${props.data.poster_path}`}
        alt={props.data.title || props.data.name}
      />
      <p className="h-fit w-32 mt-1 text-center">
        {truncatetext(props.data.title || props.data.name)}
      </p>
    </motion.div>
  );
};

export default MovieCard;
