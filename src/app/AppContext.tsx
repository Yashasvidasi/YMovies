"use client";
import React, { createContext, useState, ReactNode } from "react";

interface AppContextProps {
  listType: number;
  setListType: React.Dispatch<React.SetStateAction<number>>;
  currentSelection: number;
  setcurrentSelection: React.Dispatch<React.SetStateAction<number>>;
  currentSelectiontype: string;
  setcurrentSelectiontype: React.Dispatch<React.SetStateAction<string>>;
  allmovies: any[];
  setallmovies: React.Dispatch<React.SetStateAction<any[]>>;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [listType, setListType] = useState(1);
  const [currentSelection, setcurrentSelection] = useState(0);
  const [currentSelectiontype, setcurrentSelectiontype] = useState("movie");
  const [allmovies, setallmovies] = useState<any[]>([]);
  return (
    <AppContext.Provider
      value={{
        listType,
        setListType,
        currentSelection,
        setcurrentSelection,
        currentSelectiontype,
        setcurrentSelectiontype,
        allmovies,
        setallmovies,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
