import React from "react";
import image5 from "../../assets/images/image_5.png";
import style from "../../pages/Home/Home.module.css";
import SearchBar from "../SearchBar/SearchBar";
import FilterandSort from "../FilterandSort/FilterandSort";


const HomeView = () => {
  return (
    <div>
      <div className={style.HomeContainer}>
        <SearchBar />
        <div className={style.mainContainer}>
          <div className={style.Banner}>
            <div className={style.BannerContent}>
            <h2>
              Grab upto 50% off on <br />
              Selected headphones
            </h2>
            <button>Buy Now</button>
            </div>
            <img src={image5} alt="HeadsetGirl" />
          </div>
          <FilterandSort />

          <div
          
          ></div>
          <div className={style.mobileNavigation}>
            
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default HomeView;
