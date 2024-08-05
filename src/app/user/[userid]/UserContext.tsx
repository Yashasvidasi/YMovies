"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface UserContextProps {
  watchlater: any[];
  setwatchlater: React.Dispatch<React.SetStateAction<any[]>>;
  watchhistory: any[];
  setwatchhistory: React.Dispatch<React.SetStateAction<any[]>>;
  favorites: any[];
  setfavorites: React.Dispatch<React.SetStateAction<any[]>>;
  movieranking: any[];
  setmovieranking: React.Dispatch<React.SetStateAction<any[]>>;
  seriesranking: any[];
  setseriesranking: React.Dispatch<React.SetStateAction<any[]>>;
  searchhistory: any[];
  setsearchhistory: React.Dispatch<React.SetStateAction<any[]>>;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [watchlater, setwatchlater] = useState<any[]>([]);
  const [watchhistory, setwatchhistory] = useState<any[]>([]);
  const [favorites, setfavorites] = useState<any[]>([]);
  const [movieranking, setmovieranking] = useState<any[]>([]);
  const [seriesranking, setseriesranking] = useState<any[]>([]);
  const [searchhistory, setsearchhistory] = useState<any[]>([]);

  return (
    <UserContext.Provider
      value={{
        watchlater,
        setwatchlater,
        watchhistory,
        setwatchhistory,
        favorites,
        setfavorites,
        movieranking,
        setmovieranking,
        seriesranking,
        setseriesranking,
        searchhistory,
        setsearchhistory,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
