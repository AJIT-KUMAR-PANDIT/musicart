import React from 'react';
import { GoHome } from "react-icons/go";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Icon from '@mdi/react';
import { mdiInvoiceEdit } from '@mdi/js';
import { mdiAccountAlert } from '@mdi/js';
import { mdiAccount } from '@mdi/js';
import style from './BottomNavbar.module.css';
import { useNavigate } from 'react-router-dom';

const BottomNavbar = ({isLoggedIn,handleLogout,cartItemCount}) => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
      navigate(path);
    };

  return (

    <div className={style.bottomNavContainer}>
      <div className={style.navItem} onClick={() => handleNavigation('/')}>
        <GoHome className={style.navIcon} />
        <span className={style.navLabel}>Home</span>
      </div>
      <div className={style.navItem} onClick={() => handleNavigation('/cart')}>
        <MdOutlineAddShoppingCart className={style.navIcon} />
        <span className={style.itemCount}>{cartItemCount}</span>
        <span className={style.navLabel}>Cart</span>
      </div>
      <div className={style.navItem} onClick={() => handleNavigation('/invoices')}>
        <Icon path={mdiInvoiceEdit} size={1} className={style.navIcon} />
        <span className={style.navLabel}>Invoice</span>
      </div>
     {isLoggedIn?(
       <div className={style.navItem} onClick={handleLogout}>
       <Icon path={mdiAccount} size={1} className={style.navIcon} />
       <span className={style.navLabel}>Logout</span>
     </div>
     ):(
       <div className={style.navItem} onClick={() => handleNavigation('/login')}>
       <Icon path={mdiAccountAlert} size={1} className={style.navIcon} />
       <span className={style.navLabel}>Login</span>
     </div>
     )}
    </div>
  )
}

export default BottomNavbar;