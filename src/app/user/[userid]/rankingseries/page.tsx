"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { UserContext } from "../UserContext";
import Tile from "./Tile";
import { useRouter } from "next/navigation";
import SideBar from "@/components/SideBar";

const tierColors = [
  "to-red-600", // Tier 1: Rating 10
  "to-orange-600", // Tier 2: Rating 9-10
  "to-yellow-600", // Tier 3: Rating 8-9
  "to-green-600", // Tier 4: Rating 7-8
  "to-teal-600", // Tier 5: Rating 6-7
  "to-blue-600", // Tier 6: Rating 5-6
  "to-indigo-600", // Tier 7: Rating 4-5
  "to-purple-600", // Tier 8: Rating 3-4
  "to-pink-600", // Tier 9: Rating 2-3
  "to-gray-600", // Tier 10: Rating 1-2
  "to-gray-300", // Not Ranked: Rating 0
];

const Page: React.FC = () => {
  const router = useRouter();
  const { seriesranking, setseriesranking } = useContext(UserContext)!;
  const [localSeriesRanking, setLocalSeriesRanking] = useState(seriesranking);

  const handleRatingChange = (id: string, newRating: number) => {
    const updatedRanking = localSeriesRanking.map((series) =>
      series.id === id ? { ...series, rating: newRating } : series
    );
    setLocalSeriesRanking(updatedRanking);
  };

  const handleConfirm = () => {
    setseriesranking(localSeriesRanking);
  };

  const handleget = async () => {
    try {
      const response = await fetch(`/api/getuserdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.success) {
        setLocalSeriesRanking(data.series_ranking);
      }
    } catch (err) {
      //try again 3 times
    }
  };

  useEffect(() => {
    handleget();
  }, []);

  const getTierIndex = (rating: number) => {
    if (rating === 0) return 10;
    return 10 - Math.floor(rating);
  };

  const handleDrop = (item: any, newTierIndex: number) => {
    const oldTierIndex = getTierIndex(item.rating);
    if (oldTierIndex === newTierIndex) return;

    const updatedRanking = localSeriesRanking.map((series) =>
      series.id === item.id
        ? { ...series, rating: 10 - newTierIndex - 0.1 }
        : series
    );
    setLocalSeriesRanking(updatedRanking);
  };

  const renderTiles = (tierIndex: number) => {
    return localSeriesRanking
      .filter((series) => getTierIndex(series.rating) === tierIndex)
      .sort((a, b) => b.rating - a.rating)
      .map((series, index) => (
        <Tile
          index={index}
          key={series.id}
          id={series.id}
          name={series.name}
          poster_path={series.poster_path}
          rating={series.rating}
          onRatingChange={handleRatingChange}
        />
      ));
  };

  const renderTiers = () => {
    return tierColors.map((color, tierIndex) => {
      const [{ isOver }, drop] = useDrop(() => ({
        accept: "TILE",
        drop: (item) => handleDrop(item, tierIndex),
        collect: (monitor) => ({
          isOver: monitor.isOver(),
        }),
      }));

      return (
        <div
          ref={drop}
          key={tierIndex}
          className={`flex flex-row h-32 border border-white bg-gradient-to-r from-black ${color} p-2 rounded-md ${
            isOver ? "bg-opacity-50" : ""
          }`}
        >
          <div className="text-2xl self-center mr-5">{tierIndex}</div>
          <div className="flex flex-wrap">{renderTiles(tierIndex)}</div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex-1 p-6 w-full border border-white">
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={() => router.back()}
            className="bg-gray-300 px-4 py-2 rounded text-gray-800"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 px-6 py-2 rounded text-white"
          >
            Confirm
          </button>
        </header>
        <div className="flex flex-col w-full space-y-4">{renderTiers()}</div>
      </div>
    </div>
  );
};

const Giver = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>coming soon</div>
    </DndProvider>
  );
};

export default Giver;
