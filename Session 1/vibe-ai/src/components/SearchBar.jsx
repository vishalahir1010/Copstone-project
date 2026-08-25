import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({
  placeholder = "Search music...",
  initialValue = "",
}) => {
  const navigate = useNavigate();

  const [value, setValue] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();

    const search = value.trim();

    if (!search) return;

    navigate(`/search?q=${encodeURIComponent(search)}`);
  };

  const clearSearch = () => {
    setValue("");
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <Search size={19} className="search-bar-icon" />

      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search"
      />

      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={clearSearch}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;