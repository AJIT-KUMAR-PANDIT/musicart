import React from 'react'
import style from './Sucesspage.module.css';
import { useNavigate } from 'react-router-dom';
import image6 from '../../assets/images/confetti 1.png';
import Footer from '../../components/Footer/Footer';

const Sucesspage = () => {

    const navigate=useNavigate();
    const handleBack=()=>{
        navigate('/');
    }
  return (

    <div className={style.sucessPageDiv}>
        <div className={style.sucessOrderDiv}>
            <img src={image6} alt="confetti"></img>
            <h2>Order is placed successfully</h2>
            <p>You will be receving a confirmation email with order details</p>
            <div className={style.backtoHome}>
                <button onClick={handleBack}>Go back to Home page</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Sucesspage;