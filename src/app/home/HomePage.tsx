import React from "react";
import TopContainer from "./TopContainer";
import BottomContainer from "./BottomContainer";

function HomePage() {
  return (
    <div className="flex flex-col max-h-screen w-full overflow-hidden ">
      <TopContainer />
      <BottomContainer />
    </div>
  );
}

export default HomePage;
