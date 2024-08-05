import React from "react";
import MovieList from "./MovieList";

function BottomContainer() {
  return (
    <div className="flex flex-row bg-black w-full h-1/2 p-4">
      <MovieList />
    </div>
  );
}

export default BottomContainer;
