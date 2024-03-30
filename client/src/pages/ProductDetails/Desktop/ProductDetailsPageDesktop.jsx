import style from "./ProductDetailsPageDesktop.module.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import musicIcon from "../../../assets/musicIcon.svg";
import cart from "../../../assets/cart.svg";
import starImage from "../../../assets/star.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  getProductDetails,
  addToCart,
  getCartProduct,
} from "../../../apis/product";

const ProductDetailsPageDesktop = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const imgRef = useRef(null);
  const [productDetails, setProductDetails] = useState(null);
  const [cartLength, setCartLength] = useState(0);
  const [login, setLogin] = useState(
    localStorage.getItem("musicArtToken") ? true : false
  );

  useEffect(() => {
    getProductDetails(id).then((data) => {
      setProductDetails(data.data);
    });
    getCartProduct().then((data) => {
      if (data.status === "SUCCESS") {
        setCartLength(data.data.length);
      }
    });
  }, []);

  let stars = [];
  if (productDetails) {
    for (let i = 0; i < productDetails.rating; i++) {
      stars.push(i);
    }
  }

  const handleCart = async () => {
    const result = await addToCart(id, 1, false);
    if (result.status === "SUCCESS") {
      toast.success("Added To Cart");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <section className={style.header}>
        <Header />
      </section>
      <div className={style.container}>
        <section className={style.firstBox}>
          <div className={style.titleNav}>
            <img src={musicIcon} alt="musicIcon" />
            <span>Musicart</span>
            <a href="/">Home/</a>
            {productDetails === null ? (
              <a href="#"></a>
            ) : (
              <a>
                {productDetails.brand}
                {productDetails.model}
              </a>
            )}
          </div>
          <div
            className={style.cart}
            onClick={() => {
              redirect("/cart");
            }}
          >
            <img src={cart} alt="cartIcon" />
            <span>{cartLength}</span>
          </div>
        </section>
        <button
          className={style.backToProductBtn}
          onClick={() => {
            redirect("/");
          }}
        >
          Back to products
        </button>
        {productDetails === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={style.productDescriptionHeader}>
              {productDetails.shortDescription}
            </div>
            <section className={style.fullProductDetails}>
              <div className={style.imageBox}>
                <img
                  ref={imgRef}
                  src={productDetails.images[0]}
                  alt="headphoneicon"
                />
                <div className={style.smallImages}>
                  <img
                    src={productDetails.images[1]}
                    alt="headphoneicon"
                    onClick={(e) => {
                      imgRef.current.src = e.target.src;
                    }}
                  />
                  <img
                    src={productDetails.images[2]}
                    alt="headphoneicon"
                    onClick={(e) => {
                      imgRef.current.src = e.target.src;
                    }}
                  />
                  <img
                    src={productDetails.images[3]}
                    alt="headphoneicon"
                    onClick={(e) => {
                      imgRef.current.src = e.target.src;
                    }}
                  />
                </div>
              </div>
              <div className={style.productTextDetail}>
                <h1 className={style.productTitle}>
                  {productDetails.brand} {productDetails.model}
                </h1>
                <div className={style.ratingBox}>
                  {stars.map((item) => {
                    return <img key={item} src={starImage} alt="star icon" />;
                  })}
                  <span>({productDetails.reviewCount} Customer reviews)</span>
                </div>
                <span className={style.price}>
                  Price-₹{productDetails.price}
                </span>
                <span className={style.colorType}>
                  {productDetails.color} | {productDetails.headphoneType}
                </span>
                <div className={style.aboutProduct}>
                  <span>About this item</span>
                  <ul>
                    {productDetails.about.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </div>
                <div className={style.availableAndBrand}>
                  <div>
                    <span>Available -</span>
                    <span> {productDetails.available}</span>
                  </div>
                  <div>
                    <span>Brand -</span>
                    <span> {productDetails.brand}</span>
                  </div>
                </div>
                {login ? (
                  <div className={style.buttons}>
                    <button onClick={handleCart}>Add to cart</button>
                    <button
                      onClick={() => {
                        redirect(`/checkout/${productDetails._id}`);
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                ) : (
                  <div className={style.buttons}>
                    <div>
                      <span
                        onClick={() => {
                          redirect("/signin");
                        }}
                      >
                        Login
                      </span>
                      /
                      <span
                        onClick={() => {
                          redirect("/signup");
                        }}
                      >
                        Sign Up
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </>
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

export default ProductDetailsPageDesktop;
