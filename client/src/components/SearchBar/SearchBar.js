import React from "react";
import style from "../../pages/Home/Home.module.css";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  
  const isMobile = window.innerWidth <= 768; 
  return (
    <div>
      <div className={style.searchBar}>
        
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          placeholder={isMobile?"Search Musicart":"Search by Product Name"}
        ></input>
        <CiSearch className={style.searchIcon}/>
      </div>
    </div>
  );
};

export default SearchBar;
