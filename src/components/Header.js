import React from 'react';
import {NavLink} from "react-router-dom";
import {useCart} from "../hooks/useCart";
import Logo from '../assets/img/logo.png'
import Cart from '../assets/img/cart.svg'
import Favorite from '../assets/img/favorite_icon.svg'
import User from '../assets/img/user.svg'

const Header = (props) => {
    const {totalPrice} = useCart()

    return (
        <header className="d-flex justify-between align-center">
            <NavLink to={"/"}>
                <div className='d-flex align-center'>
                    <img width={45} height={45} src={Logo} alt="Logo"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </NavLink>
            <ul className="d-flex">
                <li onClick={props.onClockCart} className="mr-30 cu-p">
                    <img width={18} height={18} src={Cart} alt="Cart"/>
                    <span>{totalPrice} руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <NavLink to={"/favorites"}>
                        <img width={18} height={18} src={Favorite} alt="Favorites"/>
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"/orders"}>
                        <img width={18} height={18} src={User} alt="User"/>
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;