"use client";
import React from "react";
import { motion } from "framer-motion";
import { useDrag } from "react-dnd";

interface TileProps {
  index: number;
  id: string;
  name: string;
  poster_path: string;
  rating: number;
  onRatingChange: (id: string, newRating: number) => void;
}

const Tile: React.FC<TileProps> = ({
  index,
  id,
  name,
  poster_path,
  rating,
  onRatingChange,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TILE",
    item: { id, rating },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`w-20 h-28 border border-white ${
        isDragging ? "opacity-50" : ""
      }`}
      whileHover={{
        scale: 1.04,
      }}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        className="w-full h-full"
        alt=""
      />
    </motion.div>
  );
};

export default Tile;
