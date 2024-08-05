"use client";
import React, { createContext, useState, ReactNode } from "react";

interface SearchContextProps {
  type: string;
  settype: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  setquery: React.Dispatch<React.SetStateAction<string>>;
  adult: boolean;
  setadult: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  setpage: React.Dispatch<React.SetStateAction<number>>;
  searchcontent: any[];
  setsearchcontent: React.Dispatch<React.SetStateAction<any[]>>;
  totalPages: number;
  settotalPages: React.Dispatch<React.SetStateAction<number>>;
}

export const SeachContext = createContext<SearchContextProps | undefined>(
  undefined
);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [query, setquery] = useState("");
  const [type, settype] = useState("movie");
  const [adult, setadult] = useState(false);
  const [page, setpage] = useState(1);
  const [searchcontent, setsearchcontent] = useState<any[]>([]);
  const [totalPages, settotalPages] = useState(0);

  return (
    <SeachContext.Provider
      value={{
        type,
        settype,
        query,
        setquery,
        adult,
        setadult,
        page,
        setpage,
        searchcontent,
        setsearchcontent,
        totalPages,
        settotalPages,
      }}
    >
      {children}
    </SeachContext.Provider>
  );
};
