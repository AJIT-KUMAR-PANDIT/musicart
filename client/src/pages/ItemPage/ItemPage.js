import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./ItemPage.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { BACKEND_URL } from "../../constants/baseurl";


const ItemPage = ({ addtoCart, userId,isLoggedIn }) => {
  const { itemId } = useParams();
  const [product, setProduct] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setMainImageIndex(index);
  };

  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  };

  const handleCart = async () => {
    try {
      if(!isLoggedIn){
        navigate('/login');
      }
     
      if (!userId || !product._id) {
        console.error("User ID or product data missing");
        return;
      }

      console.log(userId, product._id);

     
      await axios.post(`${BACKEND_URL}/api/cart/addtoCart/${userId}`, {
        productId: product._id,
        quantity: 1,
      });

    
      addtoCart(product._id);

      
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to Cart:", error);
    }
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/items/product/${itemId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [itemId]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (product && product.images && product.images.length) {
        setMainImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length
        );
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [product]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.mainContainer}>
      <Header />
      <div className={style.container}>
        <Navbar />
        <div className={style.backLink}>
          {isMobile ? (
            <FaArrowLeft className={style.arrowIcon} onClick={handleBack} />
          ) : (
            <button onClick={handleBack} className={style.backButton}>
              Back to Home
            </button>
          )}
        </div>
        {isMobile?(
           <button  onClick={handleCart} className={style.buyNowButton}>Buy Now</button>
        ):(
  <h2 className={style.title}>{product.title}</h2>
        )}
        
        <div className={style.productDetails}>
          <div className={style.imageContainer}>
            <div className={style.carousel}>
              <div className={style.mainImageContainer}>
                <img
                  src={product.images[mainImageIndex]}
                  alt={`MainProductImage ${mainImageIndex + 1}`}
                  className={style.mainImage}
                />
              </div>
              <div className={style.thumbnailsContainer}>
                {product.images.slice(1).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`${style.thumbnail} ${
                      index === mainImageIndex ? style.activeThumbnail : ""
                    }`}
                    onClick={() => handleThumbnailClick(index + 1)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className={style.detailsContainer}>
            <h3 className={style.productName}>{product.name}</h3>
            <div className={style.rating}>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span>&#9733;</span>
              <span className={style.ratingCount}>
                ({product.numReviews} Customer reviews)
              </span>
            </div>
            {isMobile?(
              <p className={style.title}>{product.title}</p>
            ):("")}
            <p className={style.price}>Price - ₹ {product.price}</p>
            <p className={style.type}>
              {product.color} | {product.type}
            </p>
            <div className={style.aboutItem}>
              <h4>About this item</h4>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={`feature-${index}`}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className={style.availability}>
              <p>Available - {product.availability}</p>
              <p>Brand - {product.brand}</p>
            </div>
            <div className={style.buttons}>
              <button onClick={handleCart} className={style.addToCartButton}>
                Add to cart
              </button>
              <button  onClick={handleCart} className={style.buyNowButton}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ItemPage;
