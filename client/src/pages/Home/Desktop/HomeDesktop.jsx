import style from "./HomeDesktop.module.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicIcon from "../../../assets/musicIcon.svg";
import cart from "../../../assets/cart.svg";
import saleIcon from "../../../assets/saleIcon.png";
import searchIcon from "../../../assets/search.svg";
import GridIcon from "../../../assets/gridIcon.svg";
import FilledGrid from "../../../assets/filledGrid.svg";
import ListIcon from "../../../assets/list.svg";
import FilledList from "../../../assets/filledList.svg";
import imgCart from "../../../assets/imgCart.svg";
import { useEffect, useState, useRef } from "react";
import { getProduct, addToCart } from "../../../apis/product";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const redirect = useNavigate();
  const cartRef = useRef(null);
  const [view, setView] = useState("list");
  const [product, setProduct] = useState(null);
  const [filterQuery, setFilterQuery] = useState({});
  const productFetch = async () => {
    const result = await getProduct(filterQuery);
    setProduct(result.data);
  };
  useEffect(() => {
    productFetch();
  }, [filterQuery]);

  const handleCart = async (id) => {
    const result = await addToCart(id, 1);
    if (result.status === "SUCCESS") {
      toast.success("Added To Cart");
    } else {
      toast.error(result.message);
    }
  };

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
      <div className={style.header}>
        <Header />
      </div>
      <div className={style.container}>
        <section className={style.firstBox}>
          <div className={style.titleNav}>
            <img src={musicIcon} alt="musicIcon" />
            <span>Musicart</span>
            <a href="/">Home</a>
          </div>
          <div
            className={style.cart}
            onClick={() => {
              redirect("/cart");
            }}
          >
            <img src={cart} alt="cartIcon" />
            <span>View Cart</span>
          </div>
        </section>
        <section className={style.saleBanner}>
          <div>
            <h1>
              Grab upto 50% off on<br></br> Selected headphones
            </h1>
            <button>Buy Now</button>
          </div>
          <img src={saleIcon} alt="sale Icon" />
        </section>
        <section className={style.searchBox}>
          <img src={searchIcon} alt="searchIcon" />
          <input
            type="text"
            name="search"
            placeholder="Search Product"
            onChange={handleFilterChange}
          />
        </section>

        <section className={style.filterBox}>
          <div className={style.listStyleBox}>
            <img
              src={view === "grid" ? FilledGrid : GridIcon}
              alt="gridViewIcon"
              onClick={() => {
                setView("grid");
              }}
            />
            <img
              src={view === "list" ? FilledList : ListIcon}
              alt="ListViewIcon"
              onClick={() => {
                setView("list");
              }}
            />
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
              <option value="featured">Featured</option>
              <option value="0-1000">₹0-₹1000</option>
              <option value="1000-2000">₹1,000-₹10,000</option>
              <option value="10000-20000">₹10000-₹20000</option>
            </select>
          </div>
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
        </section>
        {view === "grid" ? (
          <section className={style.productContainerGrid}>
            {product === null ? (
              <center
                style={{
                  marginTop: "10vh",
                  fontWeight: "500",
                  fontSize: "3vw",
                }}
              >
                <h1>Loading<img src="/loading.webp" alt="loading"  style={{width:"211px"}}/></h1>
              </center>
            ) : product.length === 0 ? (
              <h1 className={style.noProductFound}>No product found</h1>
            ) : (
              product.map((item, index) => {
                return (
                  <div key={index}>
                    <div
                      className={style.productImg}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (e.target.src === cartRef.current.src) {
                          handleCart(item._id);
                        } else {
                          productDetailPage(item._id, item.brand, item.model);
                        }
                      }}
                    >
                      <img src={imgCart} alt="cartImg" ref={cartRef} />
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
        ) : (
          <section className={style.productContainerList}>
            {product === null ? (
              <h1>Loading<img src="/loading.webp" alt="loading"  style={{width:"211px"}}/></h1>
            ) : product.length === 0 ? (
              <h1 className={style.noProductFound}>No product found</h1>
            ) : (
              product.map((item, index) => {
                return (
                  <div className={style.singleProductBox} key={index}>
                    <div
                      className={style.imgDiv}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (e.target.src === cartRef.current.src) {
                          handleCart(item._id);
                        } else {
                          productDetailPage(item._id, item.brand, item.model);
                        }
                      }}
                    >
                      <img src={item.images[0]} alt="headphoneIcon" />
                      <img
                        src={imgCart}
                        alt="cart icon"
                        className={style.cartProductImg}
                        ref={cartRef}
                      />
                    </div>

                    <div className={style.productSpecLIst}>
                      <span className={style.productListTitle}>
                        {item.brand} {item.model}
                      </span>
                      <span className={style.productListPrice}>
                        Price - ₹ {item.price}
                      </span>
                      <span className={style.colorType}>
                        {item.color} | {item.headphoneType}
                      </span>
                      <span className={style.shortSpec}>
                        {item.shortDescription}
                      </span>
                      <button onClick={() => productDetailPage(item._id)}>
                        Details
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </section>
        )}
      </div>
      <section className={style.footer}>
        <Footer />
      </section>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Home;
