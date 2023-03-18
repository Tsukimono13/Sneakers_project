import React from 'react';
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className="d-flex justify-between align-center">
            <NavLink to={"/"}>
                <div className='d-flex align-center'>
                    <img width={40} height={40} src='/img/logo.png' alt="Logo"/>
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </NavLink>
            <ul className="d-flex">
                <li onClick={props.onClockCart} className="mr-30 cu-p">
                    <img width={18} height={18} src='/img/cart.svg' alt="Cart"/>
                    <span>1 205 руб.</span>
                </li>
                <li className="mr-20 cu-p">
                    <NavLink to={"/favorites"}>
                        <img width={18} height={18} src='/img/favorite_icon.svg' alt="Favorites"/>
                    </NavLink>
                </li>
                <li>
                    <img width={18} height={18} src='/img/user.svg' alt="User"/>
                </li>
            </ul>
        </header>
    );
};

export default Header;