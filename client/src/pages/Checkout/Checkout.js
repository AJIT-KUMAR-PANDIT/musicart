import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import {FaArrowLeft} from 'react-icons/fa';
import { BACKEND_URL } from "../../constants/baseurl";

const Checkout = ({ cartItems, userId,isLoggedIn,handleLogout}) => {
  const [finalProducts, setFinalProducts] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [selectedItem,setSelectedItem]=useState('');
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768; 

  const handleBack = () => {
    navigate("/cart");
  };
 const handleItemClick=(item)=>{
  setSelectedItem(item);
 }
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/cart/userCart/${userId}`
        );

        setFinalProducts(response.data.cart.cartItems);
        const totalPrice = response.data.cart.cartItems.reduce(
          (total, item) => total + item.quantity * item.productId.price,
          0
        );
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartProducts();
  }, [userId]);

  const handlePlaceOrder = async () => {
    try {
   
      const response = await axios.post(
        `${BACKEND_URL}/api/order/placeOrder/${userId}`,
        {
          deliveryAddress,
          paymentMethod,
          cartItems:finalProducts,
          totalPrice,
          deliveryFee: 45, 
        }
      );

      console.log("Order placed:", response.data);
      setFinalProducts([]);
      console.log('Cart items cleared:', cartItems);
      navigate("/sucess"); 
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className={style.mainContainer}>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
    <div className={style.checkoutContainer}>
      <Navbar/>
      {isMobile?(
          <div className={style.BackLink}>
          <FaArrowLeft className={style.arrowIcon} onClick={handleBack}/>
          </div>
        ):(
          <div className={style.BackLink}>
          <button onClick={handleBack} className={style.backButton}>
          Back to products
        </button>
        </div>
        )}
      <h2 className={style.checkoutHeader}>Checkout</h2>

      <div className={style.checkoutContent}>
       <div className={style.checkoutDivision}>
      <div className={style.checkoutSection}>
        <h3>1. Delivery address</h3>

        <input
          type="text"
          placeholder="Enter your delivery address"
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          className={style.addressInput}
        />
      </div>
      <hr/>

      <div className={style.checkoutSection}>
        <h3>2. Payment method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className={style.paymentSelect}
        >
          <option value="">Select payment method</option>
          <option value="COD">Pay on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>
      </div>
      <hr/>

      <div className={style.checkoutSection}>
        <h3>3. Review items and delivery</h3>
        <div>
        <div className={style.cartItems}>
          {finalProducts.map((item) => (
            <div key={item._id} className={style.cartItem}>
              {item && item.productId.images && item.productId.images.length > 0 && (
                  <img
                    src={item.productId.images[0]}
                    alt={item.name}
                    className={style.itemImage}
                    onClick={()=>handleItemClick(item)}
                  />
                )}
            </div>
          ))}
        </div>
        {selectedItem && (
        <div className={style.selectedItemDetails}>
          <h4>{selectedItem.productId.name}</h4>
          <p>Color: {selectedItem.productId.color}</p>
          
        </div>
      )}
        <p>Estimated delivery:
          <br/>
           Monday - FREE Standard Delivery</p>
        </div>
      </div>
      <hr/>
     <div className={style.ordercheckout}>
      <button onClick={handlePlaceOrder} className={style.placeOrderButton}>
        Place your order
      </button>
      <div className={style.terms}>
        <h4>Order Total:   ₹{totalPrice}</h4>
      <span>By placing your order , you agree to Musicart privacy notice and conditions of use</span>
      <div/>
     </div>
      </div>
      
      </div>
      <div className={style.orderSummary}>
      {isMobile?(
        <>
        <h3>Order Summary</h3>
        <div className={style.orderPrice}>
          <div className={style.ordercheck}>
            <p>Items</p>
          <p>₹{totalPrice}</p>
          </div>
          <div className={style.ordercheck}>
            <p>Delivery</p>
          <p>₹45.00</p>
          </div>

       
        
        </div>
        <hr/>
        <div className={style.ordercheck}>
          <h4>Order Total</h4>
        <h4> ₹{(totalPrice + 45)}</h4>
        
        </div>
        <button onClick={handlePlaceOrder} className={style.placeOrderButton}>
        Place your order
      </button>
      </>
      ):(
        <>
        <button onClick={handlePlaceOrder} className={style.placeOrderButton}>
        Place your order
      </button>
      <span>By placing your order,you agree to Musicart privacy notice and conditions of use</span>
       <hr/>
        <h3>Order Summary</h3>
        <div className={style.orderPrice}>
          <div className={style.ordercheck}>
            <p>Items</p>
          <p>₹{totalPrice}</p>
          </div>
          <div className={style.ordercheck}>
            <p>Delivery</p>
          <p>₹45.00</p>
          </div>

       
        
        </div>
        <hr/>
        <div className={style.ordercheck}>
          <h4>Order Total</h4>
        <h4> ₹{(totalPrice + 45)}</h4>
        
        </div>
        </>
      )}
        
      </div>

      
       </div>
    </div>
    <Footer/>
    </div>
  );
};

export default Checkout;
