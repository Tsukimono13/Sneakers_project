import React from 'react';
import Card from "../components/card/Card";
import {AppContext} from "../App";
import axios from "axios";


const Orders = () => {
    const {onAddToCart, onAddToFavorite} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        async function fetchDataOrders() {
            try {
                const {data} = await axios.get("https://6404f98640597b65de2e5997.mockapi.io/orders")
                setOrders(data.map((obj) => obj.items))  ///*.flat()*/ add two array
                setIsLoading(false)
            } catch (error) {
                alert("Ошибка при запросе заказов")
            }
        }

        fetchDataOrders()
    }, [])
    return (
        <div className='content p-40'>
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>

            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(12)] : orders).map((item, index) => (
                    <Card key={index}
                          {...item}
                          loading={isLoading}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;