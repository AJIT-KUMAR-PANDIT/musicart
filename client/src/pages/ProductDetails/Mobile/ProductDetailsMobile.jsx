import style from "./ProductDetailsMobile.module.css";
import { ToastContainer, toast } from "react-toastify";
import MobileNavFooter from "../../../components/MobileNavFooter/MobileNavFooter";
import Header from "../../../components/Header/Header";
import starImage from "../../../assets/star.svg";
import next from "../../../assets/next.svg";
import prev from "../../../assets/prev.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { getProductDetails, addToCart } from "../../../apis/product";
import backIcon from "../../../assets/backIcon.svg";
const ProductDetailsMobile = () => {
  const redirect = useNavigate();
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [slideCounter, setSlideCounter] = useState(0);
  const [login, setLogin] = useState(
    localStorage.getItem("musicArtToken") ? true : false
  );

  useEffect(() => {
    getProductDetails(id).then((data) => {
      setProductDetails(data.data);
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

  const goToNextImg = () => {
    slideCounter < 3 ? setSlideCounter(slideCounter + 1) : setSlideCounter(0);
  };

  const goToPrevImg = () => {
    slideCounter > 0 ? setSlideCounter(slideCounter - 1) : setSlideCounter(3);
  };

  const startX = useRef(null);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!startX.current) return;

    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    if (diff > 0) {
      goToNextImg();
    } else if (diff < -0) {
      goToPrevImg();
    }

    startX.current = null;
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <div className={style.backButton}>
          <img
            src={backIcon}
            alt="backArrow"
            onClick={() => {
              redirect("/");
            }}
          />
        </div>
        {login ? (
          <button
            className={style.buyNowButton}
            onClick={() => {
              redirect(`/checkout/${productDetails._id}`);
            }}
          >
            Buy Now
          </button>
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
        {productDetails === null ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className={style.productImgSlider}>
              <div
                className={style.productImages}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
              >
                {productDetails.images.map((item, index) => {
                  return (
                    <img
                      src={item}
                      alt={`headphoneImg${index}`}
                      style={{
                        left: `${index * 100}%`,
                        transform: `translateX(-${slideCounter * 100}%)`,
                      }}
                    />
                  );
                })}
              </div>
              <div className={style.imageNoShow}>
                <img src={prev} alt="previcon" onClick={goToPrevImg} />
                <div
                  style={{
                    backgroundColor:
                      slideCounter === 0 ? "rgba(46, 0, 82, 1)" : "",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor:
                      slideCounter === 1 ? "rgba(46, 0, 82, 1)" : "",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor:
                      slideCounter === 2 ? "rgba(46, 0, 82, 1)" : "",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor:
                      slideCounter === 3 ? "rgba(46, 0, 82, 1)" : "",
                  }}
                ></div>
                <img src={next} alt="previcon" onClick={goToNextImg} />
              </div>
            </div>
            <div className={style.porductDetails}>
              <h1 className={style.productTitle}>
                {productDetails.brand} {productDetails.model}
              </h1>
              <div className={style.ratingBox}>
                {stars.map((item) => {
                  return <img key={item} src={starImage} alt="star icon" />;
                })}
                <span>({productDetails.reviewCount} Customer reviews)</span>
              </div>
              <div className={style.productDescriptionHeader}>
                {productDetails.shortDescription}
              </div>
              <span className={style.price}>Price-₹{productDetails.price}</span>
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
            </div>
          </>
        )}
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
      <MobileNavFooter component={"home"} />
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

export default ProductDetailsMobile;
