import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import phonelogo from "../../assets/logos/phonelogo.svg"
const Header = ({ isLoggedIn, handleLogout }) => {
    return (
        <header className={styles.container}>
            <div className={styles.contact}>
                <div className={styles.logo}>
                    <img src={phonelogo} alt="musicartLogo" />
                </div>
                <p className={styles.number}>912121131313</p>
            </div>

            <div className={styles.btns}>
                <p>Get 50% off on selected items</p>
                <span> | </span>
                <p>Shop Now</p>
            </div>
            {isLoggedIn ? (
                <div className={styles.btns}>
                    Logout
                </div>
            ) : (
                <div className={styles.btns}>
                    <Link to="/login">
                        <p className={styles.btn}>Login</p>
                    </Link>
                    <span> | </span>
                    <Link to="/signup">
                        <p className={styles.btn}>Signup</p>
                    </Link>
                </div>
            )}
        </header >
    );
};

export default Header;
