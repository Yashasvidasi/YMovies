"use client";
import React, { useContext, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { SeachContext } from "./SearchContext";

const SearchBar = ({ handleSearch }: { handleSearch: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const { query, setquery, adult, setadult, type, settype } =
    useContext(SeachContext)!;
  const handleSelect = (type: React.SetStateAction<string>) => {
    settype(type);
    setDropdownOpen(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center w-full p-4 space-y-4 md:space-y-0 md:space-x-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setquery(e.target.value)}
        placeholder="Search..."
        className="flex-grow p-2 border text-black border-gray-300 rounded w-full md:w-auto"
      />

      <div className="relative flex-shrink-0 w-full md:w-auto">
        <button
          onClick={toggleDropdown}
          className="p-2 border border-gray-300 rounded flex items-center justify-between w-full md:w-40"
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
          <FaChevronDown
            className={`ml-2 transition-transform ${
              dropdownOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {dropdownOpen && (
          <ul className="absolute text-black mt-1 w-full border border-gray-300 rounded bg-white shadow-lg z-10">
            <li
              onClick={() => handleSelect("movie")}
              className="p-2 cursor-pointer hover:bg-gray-300"
            >
              Movie
            </li>
            <li
              onClick={() => handleSelect("series")}
              className="p-2 cursor-pointer hover:bg-gray-300"
            >
              Series
            </li>
            <li
              onClick={() => handleSelect("person")}
              className="p-2 cursor-pointer hover:bg-gray-300"
            >
              Person
            </li>
          </ul>
        )}
      </div>

      <label className="flex items-center space-x-2">
        <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
          <input
            type="checkbox"
            checked={adult}
            onChange={(e) => setadult(e.target.checked)}
            className={`absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer transition-all duration-200 ease-in-out transform ${
              adult
                ? "translate-x-4 bg-purple-500 border-purple-500 shadow-lg"
                : "translate-x-0 bg-gray-400 border-gray-400 shadow-md"
            }`}
            style={{ top: "0.15rem", left: "0.25rem" }}
          />
          <span
            className={`block overflow-hidden h-7 rounded-full bg-gray-300 cursor-pointer transition-all duration-200 ease-in-out ${
              adult ? "bg-purple-300" : "bg-gray-300"
            }`}
          ></span>
        </div>
        <span
          className={`text-lg ${adult ? "text-purple-400" : "text-gray-700"}`}
        >
          Include 18+
        </span>
      </label>

      <div className="w-full md:w-auto">
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded w-full md:w-auto hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
