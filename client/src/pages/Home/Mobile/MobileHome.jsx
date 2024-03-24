import MobileNavFooter from "../../../components/MobileNavFooter/MobileNavFooter";
import style from "./MobileHome.module.css";
import saleIcon from "../../../assets/mobileSale.png";
import searchIcon from "../../../assets/search.svg";
import { getProduct } from "../../../apis/product";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const MobileHome = () => {
  const redirect = useNavigate();
  const [product, setProduct] = useState(null);
  const [filterQuery, setFilterQuery] = useState({});

  const productFetch = async () => {
    const result = await getProduct(filterQuery);
    setProduct(result.data);
  };
  useEffect(() => {
    productFetch();
  }, [filterQuery]);

  const productDetailPage = (id, brand, model) => {
    const productName = brand + model;
    redirect(`/${productName}/${id}`);
  };
  const handleSort = (e) => {
    if (e.target.value === "featured") {
      setFilterQuery({
        ...filterQuery,
        featured: true,
        sortPrice: "",
        sortName: "",
      });
    } else if (e.target.value === "PriceLowest") {
      setFilterQuery({
        ...filterQuery,
        sortPrice: 1,
        sortName: "",
      });
    } else if (e.target.value === "PriceHighest") {
      setFilterQuery({
        ...filterQuery,
        sortPrice: -1,
        sortName: "",
      });
    } else if (e.target.value === "a-z") {
      setFilterQuery({
        ...filterQuery,
        sortName: 1,
        sortPrice: "",
      });
    } else {
      setFilterQuery({
        ...filterQuery,
        sortName: -1,
        sortPrice: "",
      });
    }
  };

  const handlePriceFilter = (e) => {
    if (e.target.value === "featured") {
      setFilterQuery({
        ...filterQuery,
        featured: true,
        minPrice: 0,
        maxPrice: 20000,
      });
    } else {
      const [minPrice, maxPrice] = e.target.value.split("-").map(Number);
      setFilterQuery({ ...filterQuery, minPrice, maxPrice });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (value === "featured") {
      setFilterQuery({ ...filterQuery, featured: true, [name]: "" });
    } else {
      setFilterQuery({ ...filterQuery, [name]: value });
    }
  };

  return (
    <>
      <section className={style.searchBoxHeader}>
        <div>
          <img src={searchIcon} alt="searchIcon" />
          <input
            type="text"
            name="search"
            placeholder="Search Musicart"
            onChange={handleFilterChange}
          />
        </div>
      </section>
      <div className={style.space}></div>
      <div className={style.container}>
        <section className={style.saleBanner}>
          <div>
            <h1>
              Grab upto 50% off on<br></br> Selected headphones
            </h1>
            <button>Buy Now</button>
          </div>
          <img src={saleIcon} alt="sale Icon" />
        </section>
        <section className={style.filterBox}>
          <div className={style.sortBox}>
            <span>Sort by:</span>
            <select name="sort" onChange={handleSort}>
              <option value="featured" selected>
                Featured
              </option>
              <option value="PriceLowest">Price:Lowest</option>
              <option value="PriceHighest">Price:Highest</option>
              <option value="a-z">Name:(A-Z)</option>
              <option value="z-a">Name:(Z-A)</option>
            </select>
          </div>
          <div className={style.filterSelectBox}>
            <select name="headphoneType" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Headphone type
              </option>
              <option value="featured">Featured</option>
              <option value="In ear">In-ear headphone</option>
              <option value="On ear">On-ear headphobe</option>

              <option value="Over ear">Over-ear headphone</option>
            </select>

            <select name="company" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Company
              </option>
              <option value="featured">Featured</option>
              <option value="jbl">JBL</option>
              <option value="sony">Sony</option>
              <option value="boat">Boat</option>
              <option value="zebronics">zebronics</option>
              <option value="marshall">Marshall</option>
              <option value="ptron">Ptron</option>
            </select>
            <select name="colour" onChange={handleFilterChange}>
              <option value="" disabled selected hidden>
                Colour
              </option>
              <option value="featured">Featured</option>
              <option value="blue">Blue</option>
              <option value="black">Black</option>
              <option value="white">White</option>
              <option value="brown">Brown</option>
            </select>
            <select name="price" onChange={handlePriceFilter}>
              <option value="" disabled selected hidden>
                Price
              </option>
              <option value="fetured">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-2000">₹1,000-₹10,000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
          </div>
        </section>
        <section className={style.productContainer}>
          {product === null ? (
            <h1 style={{ margin: " auto" }}>
              <b>Loading...</b>
            </h1>
          ) : product.length === 0 ? (
            <h1 className={style.noProductFound}>No product found</h1>
          ) : (
            product.map((item, index) => {
              return (
                <div
                  key={item._id}
                  onClick={() => {
                    productDetailPage(item._id, item.brand, item.model);
                  }}
                >
                  <div className={style.productImg}>
                    <img src={item.images[0]} alt="headphoneIcon" />
                  </div>
                  <div className={style.productSpec}>
                    <span className={style.productTitle}>
                      {item.brand} {item.model}
                    </span>
                    <span className={style.productPrice}>
                      Price-₹ {item.price}
                    </span>
                    <span className={style.productType}>
                      {item.color} | {item.headphoneType}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </section>
      </div>
      <MobileNavFooter component={"home"} />
    </>
  );
};

export default MobileHome;
