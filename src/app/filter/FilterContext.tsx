import { useSelectedLayoutSegments } from "next/navigation";
import React, { createContext, useState, ReactNode } from "react";

interface FilterContextProps {
  type: string;
  settype: React.Dispatch<React.SetStateAction<string>>;
  release: string;
  setrelease: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setsort: React.Dispatch<React.SetStateAction<string>>;
  order: string;
  setorder: React.Dispatch<React.SetStateAction<string>>;
  genre: string;
  setgenre: React.Dispatch<React.SetStateAction<string>>;
  lang: string;
  setlang: React.Dispatch<React.SetStateAction<string>>;
  page: number;
  setpage: React.Dispatch<React.SetStateAction<number>>;
  totalpages: number;
  settotalpages: React.Dispatch<React.SetStateAction<number>>;
  filtercontent: any[];
  setfiltercontent: React.Dispatch<React.SetStateAction<any[]>>;
}

export const FilterContext = createContext<FilterContextProps | undefined>(
  undefined
);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [type, settype] = useState("movie");
  const [release, setrelease] = useState("any");
  const [sort, setsort] = useState("popularity");
  const [order, setorder] = useState("desc");
  const [genre, setgenre] = useState("any");
  const [lang, setlang] = useState("any");
  const [page, setpage] = useState(1);
  const [totalpages, settotalpages] = useState(0);
  const [filtercontent, setfiltercontent] = useState<any[]>([]);

  return (
    <FilterContext.Provider
      value={{
        type,
        settype,
        release,
        setrelease,
        sort,
        setsort,
        order,
        setorder,
        genre,
        setgenre,
        lang,
        setlang,
        page,
        setpage,
        totalpages,
        settotalpages,
        filtercontent,
        setfiltercontent,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
