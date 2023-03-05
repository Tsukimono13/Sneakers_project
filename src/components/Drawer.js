import React from 'react';

const Drawer = (props) => {
    return (
        <div className="overlay">
        <div className="drawer">
            <h2 className="mb-30 d-flex justify-between">Корзина<img onClick={props.onClose} className="removeBtn cu-p" src="/img/button_x.svg" alt="Remove"/></h2>

            <div className="items">
                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(/img/sneakers/1.svg)'}}
                         className="cartItemImg"></div>
                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <b>12 999 руб.</b>
                    </div>
                    <img className="removeBtn" src="/img/button_x.svg" alt="Remove"/>
                </div>

                <div className="cartItem d-flex align-center mb-20">
                    <div style={{backgroundImage: 'url(/img/sneakers/7.svg)'}} className="cartItemImg"></div>
                    <div className="mr-20 flex">
                        <p className="mb-5">Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <b>15 199 руб.</b>
                    </div>
                    <img className="removeBtn" src="/img/button_x.svg" alt="Remove"/>
                </div>
            </div>



            <div className="cartTotalBlock">
                <ul>
                    <li>
                        <span>Итого:</span>
                        <div></div>
                        <b>28 198 руб.</b>
                    </li>
                    <li>
                        <span>Налог 5%:</span>
                        <div></div>
                        <b>1 410 руб.</b>
                    </li>
                </ul>

                <button className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
            </div>
        </div>
        </div>
    );
};

export default Drawer;