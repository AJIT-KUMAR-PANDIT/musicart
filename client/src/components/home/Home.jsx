import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import logo from "../../images/image1.png";
import img from "../../images/image2.png";
import { IoSearchOutline } from "react-icons/io5";
import { BsFillGridFill, BsGrid } from "react-icons/bs";
import { TiThList, TiThListOutline } from "react-icons/ti";
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getALLFilters, getSortByFilter } from "../../utils/filters";
import { useSelector, useDispatch } from "react-redux";
import Feedback from "../Feedback/Feedback";
import {
  fetching,
  getAllProductByHeadTypeFilterAsync,
  getAllProductsAsync,
  getAllProductsByColourFilterAsync,
  getAllProductsByCompanyFilterAsync,
  getAllProductsByKeywordFilterAsync,
  getAllProductsByPriceFilterAsync,
  getAllProductsBySortComapnyFilterAsync,
  getAllProductsBySortPriceFilterAsync,
  products,
  productToggle,
} from "../../Redux/Product/ProductSlice";
import { getUserNameIntitials } from "../../utils/getUserNameIntitials";
import {
  addToCartAsync,
  addToCartSucc,
  clearAddToCartSucc,
  logOutUser,
  setDeleteModal,
  setNewPage,
  showDeleteModal,
  user,
  userCartToggle,
  userInfoToggle,
  userToggle,
} from "../../Redux/User/UserSlice";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../DeleteModal/DeleteModal";
import { getAllProductsBySortPriceFilter } from "../../Redux/Product/ProductApi";

const Home = () => {
  const [layout, setLayout] = useState("grid");
  const [showProfile, setShowProfile] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [showSearchPlaceHoder, setShowSearchPlaceHolder] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [loader, setloader] = useState(false);
  const filters = getALLFilters();
  const sort = getSortByFilter();
  const navigate = useNavigate();
  const toggle = useSelector(productToggle);
  const toggle1 = useSelector(userToggle);
  const toggle2 = useSelector(userCartToggle);
  const allListedProducts = useSelector(products);
  const userInfo = useSelector(user);
  const productFetching = useSelector(fetching);
  const productAddedTocCartSuccesfullly = useSelector(addToCartSucc);

  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleLogoutUser = () => {
    dispatch(logOutUser());
  };
  const deleteModalStatus = useSelector(showDeleteModal);

  const handleSetSerachInput = (val) => {
    setloader(true);
    dispatch(getAllProductsByKeywordFilterAsync(val));
    setShowSearchPlaceHolder(false);
    setSearchInput(val);
  };
  const handleNavigateUser = (route) => {
    navigate(route);
  };

  const handleNavigateUserToDetailPage = (id) => {
    navigate(`product/detail/${id}`);
  };

  const handleFilterProductsByType = (name, val) => {
    const values = JSON.parse(localStorage.getItem("filterValues"));

    if (name === "Headphone type") {
      if (val === "Remove filter") {
        values.useType = null;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      } else {
        setloader(true);

        values.useType = val;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
        dispatch(getAllProductByHeadTypeFilterAsync(values));
      }
    } else if (name === "Company") {
      if (val === "Remove filter") {
        values.company = null;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      } else {
        setloader(true);
        values.company = val;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      }

      dispatch(getAllProductsByCompanyFilterAsync(values));
    } else if (name === "Colour") {
      if (val === "Remove filter") {
        values.colour = null;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      } else {
        setloader(true);
        values.colour = val;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
        dispatch(getAllProductsByColourFilterAsync(values));
      }
    } else if (name === "Sort by : Featured") {
      if (val === "Remove filter") {
        values.companySort = null;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      } else {
        setloader(true);
        if (val === "Name : (A-Z)") {
          values.companySort = "asc";
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsBySortComapnyFilterAsync(values));
        } else if (val === "Name : (Z-A)") {
          values.companySort = "desc";
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsBySortComapnyFilterAsync(values));
        } else if (val === "Price : Lowest") {
          values.priceSort = "asc";
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsBySortPriceFilterAsync(values));
        } else if (val === "Price : Highest") {
          values.priceSort = "desc";
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsBySortPriceFilterAsync(values));
        }
      }
    } else {
      if (val === "Remove filter") {
        values.priceSort = null;
        localStorage.removeItem("filterValues");
        localStorage.setItem("filterValues", JSON.stringify(values));
      } else {
        setloader(true);
        if (val === "₹0 - ₹1,000") {
          values.minPrice = 1;
          values.maxPrice = 1000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        } else if (val === "₹1,000 - ₹2,000") {
          values.minPrice = 1000;
          values.maxPrice = 2000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        } else if (val === "₹2,000 - ₹3,000") {
          values.minPrice = 2000;
          values.maxPrice = 3000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        } else if (val === "₹3,000 - ₹4,000") {
          values.minPrice = 3000;
          values.maxPrice = 4000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        } else if (val === "₹4,000 - ₹10,000") {
          values.minPrice = 4000;
          values.maxPrice = 10000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        } else {
          values.minPrice = 10000;
          values.maxPrice = 20000;
          localStorage.removeItem("filterValues");
          localStorage.setItem("filterValues", JSON.stringify(values));
          dispatch(getAllProductsByPriceFilterAsync(values));
        }
      }
    }
  };

  const handleAddToCart = (productId) => {
    const alreadyInCart = userInfo?.cart?.find(({ id }) => id === productId);
    if (!alreadyInCart) {
      dispatch(addToCartAsync({ productId }));
    } else {
      toast.error("Product is already in cart!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const handleResetAddToCartSucc = () => {
    dispatch(clearAddToCartSucc());
  };

  const updateUserNewPage = (page) => {
    dispatch(setNewPage({ page }));
  };

  
  useEffect(() => {
    if (userInfo?.name) {
      setName(getUserNameIntitials(userInfo?.name));
    }
  }, [toggle1]);

  useEffect(() => {
    localStorage.removeItem("filterValues");
    const filterValues = {
      colour: null,
      useType: null,
      company: null,
      minPrice: null,
      maxPrice: null,
      companySort: null,
      priceSort: null,
    };

    localStorage.setItem("filterValues", JSON.stringify(filterValues));
  }, []);

  useEffect(() => {
    if (productAddedTocCartSuccesfullly) {
      toast.success("Product added to cart succesfully!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      handleResetAddToCartSucc();
    }
  }, [toggle2]);

  useEffect(() => {
    setAllProducts(allListedProducts);

    if (!productFetching) {
      setloader(false);
    }
  }, [toggle]);

  useEffect(() => {
    updateUserNewPage("Home");
  }, []);

  return (
    <section className={style.homecontainer} style={{marginTop:"100px"}}>
      <ToastContainer />
      {deleteModalStatus && (
        <DeleteModal
          route="/"
          pageName="Home"
          productName="your account for ever"
        />
      )}

      {userInfo?.name && <Feedback />}
      <div
        className={`${
          deleteModalStatus ? style.homesectionblur : style.homesection
        }`}
      >
        <div className={style.homesectionup}>
          <div className={style.sectionupbox}>
            <div className={style.logocontainer}>
              <div className={style.logoup}>
                <img src={logo} alt="Musicart" />
                <span>Musicart</span>
              </div>
              <span className={style.logodown}>Home</span>
              {userInfo?.name && (
                <span
                  onClick={() => handleNavigateUser("/invoice")}
                  className={style.logodown}
                >
                  Invoice
                </span>
              )}
            </div>
            {userInfo?.name && (
              <div className={style.useroptions}>
                <span onClick={() => handleNavigateUser("/cart")}>
                  <MdShoppingCart size={23} /> View cart{" "}
                  {userInfo?.cart?.length}
                </span>
                <div
                  onClick={() => setShowProfile(!showProfile)}
                  className={style.userprofile}
                >
                  <span>{name}</span>
                  {showProfile && (
                    <div className={style.profile}>
                      <span>{userInfo?.name} </span>
                      <span className={style.line}></span>
                      <span onClick={() => handleLogoutUser()}>Logout</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className={style.bannercontainer}>
            <div className={style.bannerbox}>
              <div className={style.bannertext}>
                <span>
                  Grab upto 50% off <br /> on Selected headphones
                </span>
                <span style={{ color: "white" }} className={style.buynow}>
                  Buy now
                </span>
              </div>
              <div className={style.bannerimgcontainer}>
                <img className={style.banner} src={img} alt="" />
              </div>
            </div>
          </div>
          <div
            onClick={() => setShowSearchPlaceHolder(false)}
            onMouseEnter={() => setShowSearchPlaceHolder(false)}
            onMouseLeave={() =>
              setShowSearchPlaceHolder(searchInput ? false : true)
            }
            className={style.input}
          >
            <input
              onChange={(e) => handleSetSerachInput(e.target.value)}
              value={searchInput}
              type="text"
            />
            {showSearchPlaceHoder && (
              <div>
                <IoSearchOutline size={23} color="#666666" />
                <span>Search by Product Name</span>
              </div>
            )}
          </div>
          <div className={style.filtercontainer}>
            <div className={style.filterbox}>
              <div className={style.layout}>
                {layout === "grid" ? (
                  <BsFillGridFill onClick={() => setLayout("grid")} />
                ) : (
                  <BsGrid onClick={() => setLayout("grid")} />
                )}
                {layout === "list" ? (
                  <TiThList size={26} onClick={() => setLayout("list")} />
                ) : (
                  <TiThListOutline onClick={() => setLayout("list")} />
                )}
              </div>
              <div className={style.filter}>
                {filters?.map(({ name, types, remove }, i) => {
                  return (
                    <select
                      onChange={(e) =>
                        handleFilterProductsByType(name, e.target.value)
                      }
                      className={style.selectsection}
                      key={i}
                    >
                      <option>{name}</option>
                      <option>{remove}</option>;
                      {types?.map((type, i) => (
                        <option value={type} key={i}>
                          {type}
                        </option>
                      ))}
                    </select>
                  );
                })}
              </div>
            </div>
            <div className={style.sort}>
              <select
                onChange={(e) =>
                  handleFilterProductsByType(
                    "Sort by : Featured",
                    e.target.value
                  )
                }
                className={style.selectsection}
              >
                <option value={sort.name}>{sort.name}</option>
                <option value={sort.name}>{sort.remove}</option>

                {sort?.types?.map((type, i) => (
                  <option key={i}>{type}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {JSON.parse(localStorage.getItem("filterValues")) &&
        allProducts?.length > 0 ? (
          !loader ? (
            <>
              {layout === "grid" ? (
                <div className={style.homesectiondown}>
                  {allProducts?.map(
                    ({
                      title,
                      image,
                      price,
                      useType,

                      colour,
                      id,
                    }) => {
                      return (
                        <div key={id} className={style.productcontainer}>
                          <div className={style.imgcontainer}>
                            <div className={style.img}>
                              <img
                                onClick={() =>
                                  handleNavigateUserToDetailPage(id)
                                }
                                src={image}
                                alt={title}
                              />
                              {userInfo?.name && (
                                <span
                                  onClick={() => handleAddToCart(id)}
                                  className={style.carticon}
                                >
                                  <MdOutlineAddShoppingCart color="#1D7000" />
                                </span>
                              )}
                            </div>
                          </div>
                          <div className={style.productdescription}>
                            <span className={style.title}>{title}</span>
                            <span className={style.price}>
                              Price - ₹{price}
                            </span>
                            <span className={style.description}>
                              {colour} | {useType}
                            </span>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
                <>
                  <div className={style.homesectiondownflex}>
                    {allProducts?.map(
                      ({
                        title,
                        image,
                        price,
                        useType,
                        description,
                        colour,
                        id,
                      }) => {
                        return (
                          <div
                            key={id}
                            className={style.productcontainerflex}
                          >
                            <div className={style.imgcontainerflex}>
                              <div className={style.imgflex}>
                                <img
                                  onClick={() =>
                                    handleNavigateUserToDetailPage(id)
                                  }
                                  src={image}
                                  alt={title}
                                />
                                {userInfo?.name && (
                                  <span
                                    onClick={() => handleAddToCart(id)}
                                    className={style.carticonflex}
                                  >
                                    <MdOutlineAddShoppingCart color="#1D7000" />
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className={style.productdescriptionflex}>
                              <span className={style.titleflex}>{title}</span>
                              <span className={style.priceflex}>
                                Price - ₹{price}
                              </span>
                              <span className={style.colourflex}>
                                {colour} | {useType}
                              </span>
                              <span className={style.descriptionflex}>
                                {description}
                              </span>
                              <button
                                onClick={() =>
                                  handleNavigateUserToDetailPage(id)
                                }
                                className={style.detailbtnflex}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <div className={style.homesectiondownflex}>
                    {allProducts?.map(
                      ({
                        title,
                        image,
                        price,
                        useType,
                        description,
                        colour,
                        id,
                      }) => {
                        return (
                          <div
                            key={id}
                            className={style.productcontainerflexmobile}
                          >
                            <div className={style.imgcontainerflex}>
                              <div className={style.imgflex}>
                                <img
                                  onClick={() =>
                                    handleNavigateUserToDetailPage(id)
                                  }
                                  src={image}
                                  alt={title}
                                />
                                {userInfo?.name && (
                                  <span
                                    onClick={() => handleAddToCart(id)}
                                    className={style.carticonmobileflex}
                                  >
                                    <MdOutlineAddShoppingCart color="#1D7000" />
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className={style.productdescriptionflex}>
                              <span className={style.titleflex}>{title}</span>
                              <span className={style.priceflex}>
                                Price - ₹ {price}
                              </span>
                              <span className={style.colourflex}>
                                {colour} | {useType}
                              </span>
                              <span className={style.descriptionflex}>
                                {description.slice(0, 28)}...
                              </span>
                              <button className={style.detailbtnflex}>
                                Details
                              </button>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className={style.loader}>
               <img src="/loader.gif" alt="loader" style={{zIndex:"111px", maxHeight:"50vh", maxWidth:"20vw"}}/>
            </div>
          )
        ) : (
          <div className={style.noresultfoundsec}>
            <span style={{display:"flex", justifyContent:"center", alignItems:"center"}}>  <img src="/loader.gif" alt="loader" style={{zIndex:"111px", maxHeight:"50vh", maxWidth:"20vw"}}/></span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
