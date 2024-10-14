import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import image5 from "../../assets/images/image_5.png";
import style from "./Home.module.css";
import axios from "axios";
import GridItem from "../../components/GridItem/GridItem";
import ListItem from "../../components/ListItem/ListItem";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterandSort from "../../components/FilterandSort/FilterandSort";
import Feedback from "../../components/Feedback/Feedback";
import feedbackIcon from "../../assets/logos/feedback.svg";
import { BACKEND_URL } from "../../constants/baseurl";


const Home = ({
  productItem,
  addtoCart,
  userId,
  userName,
  cartItemCount,
  isLoggedIn,
  handleLogout,
  isMobile
}) => {
  const [productItems, setProductItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [selectedHeadphoneType, setSelectedHeadphoneType] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const [sortCriteria, setSortCriteria] = useState("featured");
  const [sortedProducts, setSortedProducts] = useState([]);

  const [isGridView, setIsGridView] = useState(true);

  const [isModalOpen,setIsModalOpen]=useState(false);

  const openModal=()=>{
    setIsModalOpen(!isModalOpen);
  }
  const closeModal=()=>{
    setIsModalOpen(false);
  }

  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  const handleDropdownChange = (event, setStateFunc) => {
    console.log("Dropdown changed:", event.target.value);
    setStateFunc(event.target.value);
  };

  const handleSearch = async (searchText) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/items/searchproduct?searchQuery=${searchText}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const filterItems = async () => {
      try {
        const resposne = await axios.get(
          `${BACKEND_URL}/api/items/filter?headphoneType=${selectedHeadphoneType}&company=${selectedCompany}&color=${selectedColor}&price=${selectedPrice}`
        );
        setFilteredItems(resposne.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (
      selectedHeadphoneType ||
      selectedCompany ||
      selectedColor ||
      selectedPrice
    ) {
      filterItems();
    }
  }, [selectedHeadphoneType, selectedColor, selectedCompany, selectedPrice]);

  useEffect(() => {
    const sortProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}}/api/items/sort?sortCriteria=${sortCriteria}`
        );
        setSortedProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    sortProducts();
  }, [sortCriteria]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/items/allproducts`
        );
        setProductItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [productItems]);

  return (
    <div className={style.HomeContainer}>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className={style.mainContainer}>
        
        {isMobile?(
          <>
          <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
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
        </>
        ):(
          <>
          <Navbar
          isLoggedIn={isLoggedIn}
          userName={userName}
          cartItemCount={cartItemCount}
          handleLogout={handleLogout}
        />
          <div className={style.Banner}>
          <h2>
            Grab upto 50% off on <br />
            Selected headphones
          </h2>
          <img src={image5} alt="HeadsetGirl" />
        </div>
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
        </>
        )}
        
        <FilterandSort
          selectedHeadphoneType={selectedHeadphoneType}
          setSelectedHeadphoneType={setSelectedHeadphoneType}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          sortCriteria={sortCriteria}
          setSortCriteria={setSortCriteria}
          toggleView={toggleView}
          handleDropdownChange={handleDropdownChange}
        />

        <div className={isGridView ? style.GridContainer : style.listContainer}>
          {searchQuery.trim() === "" &&
          selectedHeadphoneType === "" &&
          selectedCompany === "" &&
          selectedColor === "" &&
          selectedPrice === "" &&
          sortCriteria === "featured" ? (
            <>
              {productItems.map((item) => (
                <div key={item.id}>
                  {isGridView ? (
                    <GridItem
                      item={item}
                      addtoCart={addtoCart}
                      userId={userId}
                    />
                  ) : (
                    <ListItem
                      item={item}
                      addtoCart={addtoCart}
                      userId={userId}
                    />
                  )}
                </div>
              ))}
            </>
          ) : searchQuery.trim() === "" ? (
            <>
              {selectedHeadphoneType === "" &&
              selectedCompany === "" &&
              selectedColor === "" &&
              selectedPrice === "" ? (
                <>
                  {sortedProducts.map((item) => (
                    <div key={item.id}>
                      {isGridView ? (
                        <GridItem
                          item={item}
                          addtoCart={addtoCart}
                          userId={userId}
                        />
                      ) : (
                        <ListItem
                          item={item}
                          addtoCart={addtoCart}
                          userId={userId}
                        />
                      )}
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {filteredItems.map((item) => (
                    <div key={item.id}>
                      {isGridView ? (
                        <GridItem
                          item={item}
                          addtoCart={addtoCart}
                          userId={userId}
                        />
                      ) : (
                        <ListItem
                          item={item}
                          addtoCart={addtoCart}
                          userId={userId}
                        />
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          ) : (
            <>
              {searchResults.map((item) => (
                <div key={item.id}>
                  {isGridView ? (
                    <GridItem
                      item={item}
                      addtoCart={addtoCart}
                      userId={userId}
                    />
                  ) : (
                    <ListItem
                      item={item}
                      addtoCart={addtoCart}
                      userId={userId}
                    />
                  )}
                </div>
              ))}
            </>
          )}
        </div>
        {isLoggedIn?(
          <>
          <div className={style.feedbackContainer} onClick={openModal}>
                <img src={feedbackIcon} alt="feedback icon" />
            </div>
          <Feedback  isOpen={isModalOpen} onClose={closeModal}/>
        </>
        ):('')}
        
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;
