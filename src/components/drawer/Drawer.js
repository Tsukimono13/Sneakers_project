import React from 'react';
import Info from "../Info";

import axios from "axios";
import {useCart} from "../../hooks/useCart";
import style from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const Drawer = ({onClose, items = [], onRemove, opened}) => {
    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const onClickCompleted = async () => {
        try {
            setIsLoading(true)
            const {data} = await axios.post("https://6404f98640597b65de2e5997.mockapi.io/orders", {items: cartItems});
            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete('https://6404f98640597b65de2e5997.mockapi.io/cart/' + item.id);
                await delay(1000);
            }
        } catch (error) {
            alert("Ошибка при создании заказа :(")
        }
        setIsLoading(false)
    }
    return (
        <div className={`${style.overlay} ${opened ? style.overlayVisible : ''}`}>
            <div className={style.drawer}>
                <h2 className="mb-30 d-flex justify-between">Корзина
                    <img onClick={onClose} className="removeBtn cu-p" src="img/button_x.svg" alt="Remove"/>
                </h2>
                {
                    items.length > 0 ? (
                            <div className="d-flex flex-column flex">
                                <div className="items flex">
                                    {items.map((obj) => (
                                        <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                            <div style={{backgroundImage: `url(${obj.imageUrl})`}}
                                                 className="cartItemImg"></div>
                                            <div className="mr-20 flex">
                                                <p className="mb-5">{obj.title}</p>
                                                <b>{obj.price} руб.</b>
                                            </div>
                                            <img onClick={() => onRemove(obj.id)} className="removeBtn"
                                                 src="img/button_x.svg"
                                                 alt="Remove"/>
                                        </div>
                                    ))}
                                </div>
                                <div className="cartTotalBlock">
                                    <ul>
                                        <li>
                                            <span>Итого:</span>
                                            <div></div>
                                            <b>{totalPrice} руб.</b>
                                        </li>
                                        <li>
                                            <span>Налог 5%:</span>
                                            <div></div>
                                            <b>{Math.floor(totalPrice / 100 * 5)} руб.</b>
                                        </li>
                                    </ul>
                                    <button disabled={isLoading} onClick={onClickCompleted} className="greenButton"><img
                                        src="img/arrow.svg"
                                        alt="Arrow"/>Оформить
                                        заказ
                                    </button>
                                </div>
                            </div>)
                        : (
                            <Info title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                                  description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                                  image={isOrderComplete ? "img/oderIsDone.svg" : "img/emptyCart.svg"}/>
                        )
                }
            </div>
        </div>
    );
};

export default Drawer;