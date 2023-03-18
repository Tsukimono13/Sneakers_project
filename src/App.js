import Card from "./components/card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cardOpened, setCardOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')

    React.useEffect(() => {
        axios.get("https://6404f98640597b65de2e5997.mockapi.io/items")
            .then((res) => {
                setItems(res.data)
            })
        axios.get("https://6404f98640597b65de2e5997.mockapi.io/cart")
            .then((res) => {
                setCartItems(res.data)
            })
        axios.get("https://6404f98640597b65de2e5997.mockapi.io/favorites")
            .then((res) => {
                setFavorites(res.data)
            })
    }, [])

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => favObj.id === obj.id)) {
                axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/favorites`);
            } else {
                const {data} = await axios.post(`https://6404f98640597b65de2e5997.mockapi.io/favorites/${obj.id}`, obj);
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавть в закладки')
        }

    }
    const onAddToCart = (obj) => {
        axios.post("https://6404f98640597b65de2e5997.mockapi.io/cart", obj);
        setCartItems(prev => [...prev, obj])
    }
    const onRemoveItem = (id) => {
        console.log(id)
        axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    console.log(items)
    return (
        <div className="wrapper clear">
            {cardOpened && <Drawer onClose={() => setCardOpened(false)} items={cartItems} onRemove={onRemoveItem}/>}
            <Header onClockCart={() => setCardOpened(true)}/>
            <Routes>
                <Route path={"/"} element={<Home items={items}
                                                 searchValue={searchValue}
                                                 setSearchValue={setSearchValue}
                                                 onChangeSearchInput={onChangeSearchInput}
                                                 onAddToCart={onAddToCart}
                                                 onAddToFavorite={onAddToFavorite}/>}/>
                <Route path={"/favorites"}
                       element={<Favorites favorites={favorites} items={items} onAddToFavorite={onAddToFavorite}/>}/>
            </Routes>


        </div>
    );
}

export default App;
