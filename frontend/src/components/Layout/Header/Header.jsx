import { Link } from "react-router-dom";
import { useMemo, useState } from "react";

import styles from './Header.module.css'

import logo from "../../../assets/images/logo.png";

import { FaAngleDown,FaCircleUser, FaCartShopping, FaMagnifyingGlass } from "react-icons/fa6";
import DropUp from "../../UI/SubMenu/DropUp/DropUp";

import { useAuth } from '../../../context/AuthContext';
import { useCategory } from "../../../context/CategoryContext";
import { useCart } from "../../../context/CartContext";

import { buildCategoryTree } from "../../../utils/categoryTree";

import { guestMenu, userMenu } from "../../../config/menuConfig";

export const Header = () => {
    const userCart = useCart();
    const totalItems = userCart.cart.length

    const { user, logout } = useAuth();

    const [isHoverUser, setIsHoverUser] = useState(false);
    const [isHover, setIsHover] = useState(false);
   
    const { categories } = useCategory(); // Lấy data từ Context

    const categoryTree = useMemo(
        () => buildCategoryTree(categories),
        [categories]
    );

    return (
    <header className={`d-flex ${styles.header}`}>
        <div className={`${styles.revealOnLoad} ${styles.delay2} ${styles.headerBegin}`}>
            <Link to="/" className={styles.logo}>
                <img className={styles.logoImg} src={logo} alt="Logo" />
            </Link>
        </div>
        <div className={styles.navbar}>
            <nav className={`d-flex ${styles.navbarMenu} ${styles.revealText} ${styles.delay2}`}>
                <div className={`d-flex ${styles.item}`}
                    onMouseEnter={()=> setIsHover(true)}
                    onMouseLeave={()=> setIsHover(false)}
                >
                    <div className={`position-relative`}>
                        <Link className={`${styles.itemLink}`} to="/collections">
                            Sản phẩm<FaAngleDown/>
                        </Link>
                        <DropUp isHover={isHover} items={categoryTree}/>
                    </div>
                </div>
                <div className={`d-flex ${styles.item}`}>
                    <Link className={styles.itemLink} to="/collections/newest">Sản phẩm mới</Link>
                </div>
                <div className={`d-flex ${styles.item}`}>
                    <Link className={styles.itemLink} to="/auth">NEM PLUS</Link>
                </div>   
                <div className={`d-flex ${styles.item}`}>
                    <Link className={styles.itemLink} to="/auth">Sản phẩm sale<FaAngleDown/></Link>
                </div> 
                <div className={`d-flex ${styles.item}`}>
                    <Link className={styles.itemLink} to="/auth">Độc quyền online<FaAngleDown/></Link>
                </div> 
                <div className={`d-flex ${styles.item}`}>
                    <Link className={styles.itemLink} to="/auth">Bộ sưu tập<FaAngleDown/></Link>
                </div> 
            </nav>
        </div>
        <ul className={`d-flex ${styles.navbarActions}`}>
            <li className={styles.actionItem}>
                <a><FaMagnifyingGlass /></a>
            </li>
            <li onMouseEnter={()=> setIsHoverUser(true)}
                    onMouseLeave={()=> setIsHoverUser(false)} className={styles.actionItem}>
                <a><FaCircleUser />
                    {user ? user.name : "Tài khoản"}
                </a>
                <div className={`position-relative`}>
                        <DropUp isHover={isHoverUser} items={user ? userMenu : guestMenu}/>
                </div>
            </li>
            <li className={styles.actionItem}>
                <Link className={styles.itemLink} to="/cart"><FaCartShopping />Cart</Link>
                <span className={styles.cartCount}>{totalItems}</span>
            </li>
        </ul>

        
    </header>
  );
};