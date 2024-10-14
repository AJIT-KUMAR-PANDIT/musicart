import React, { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import image4 from "../../assets/images/image 4.png";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, userName, cartItemCount, handleLogout }) => {
    const location = useLocation();
    const { pathname } = location;

    const isMobile = window.innerWidth <= 768;

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const getInitials = (name) => {
        if (name) {
            const nameParts = name.split(' ');
            if (nameParts.length === 1) {
                return nameParts[0].slice(0, 2);
            } else {
                return nameParts[0][0] + nameParts[1][0];
            }
        }
        return 'Error';
    };

    return (
        <div className={style.navbar}>
            {isMobile ? (
                <div className={style.mobileNavbar}>
                    <img src={image4} alt="musiclogo" />
                    <h3>Musicart</h3>
                </div>
            ) : (
                <div className={style.logoDiv}>
                    <div className={style.musiclogo}>
                        <img src={image4} alt="logo"></img>
                        <h3>Musicart</h3>
                        <div className={style.linksLeft}>
                            {pathname === "/" && (
                                <>
                                    <h4>Home</h4>
                                    <h4>
                                        <Link to="/invoices" className={style.linkinvoice}>
                                            Invoice
                                        </Link>
                                    </h4>
                                </>
                            )}
                            {pathname === "/cart" && <h4>Home/viewCart</h4>}
                            {pathname === "/checkout" && <h4>Home/Checkout</h4>}
                            {pathname === "/invoices" && <h4>Home/invoices</h4>}
                        </div>
                    </div>
                    <div className={style.navLinks}>
                        <div className={style.cartLogo}>
                            <IoCartOutline className={style.cartIcon} />
                            <Link to="/cart" className={style.linkstyle}>
                                View Cart {cartItemCount}
                            </Link>
                        </div>
                        <div className={style.userContainer}>
                            <div
                                className={style.userInitial}
                                onClick={handleDropdownToggle}
                            >
                                {isLoggedIn && userName && (
                                    <h3>
                                        {getInitials(userName).toUpperCase()}
                                    </h3>
                                )}
                            </div>
                            {dropdownOpen && isLoggedIn && (
                                <div className={style.dropdownContent}>
                                    <p>{userName}</p>
                                    <button onClick={handleLogout} className={style.logoutButton}>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
