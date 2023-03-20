import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const AppContext = React.createContext({})

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [cardOpened, setCardOpened] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(true)

    console.log(items)
    React.useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get("https://6404f98640597b65de2e5997.mockapi.io/cart")
            //const favoritesResponse = await axios.get("https://6404f98640597b65de2e5997.mockapi.io/favorites")
            const itemsResponse = await axios.get("https://6404f98640597b65de2e5997.mockapi.io/items")
            setIsLoading(false)
            setCartItems(cartResponse.data)
            //setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)
        }

        fetchData()
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
        try {
            if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
                axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/cart/${obj.id}`);
                setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)))
            } else {
                axios.post("https://6404f98640597b65de2e5997.mockapi.io/cart", obj);
                setCartItems(prev => [...prev, obj])
            }
        } catch (error) {
        }
    }
    const onRemoveItem = (id) => {
        axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/cart/${id}`);
        setCartItems((prev) => prev.filter(item => item.id !== id))
    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.id) === Number(id))
}
    return (
        <AppContext.Provider value={{items, favorites, cartItems, isItemAdded}}>
        <div className="wrapper clear">
            {cardOpened && <Drawer onClose={() => setCardOpened(false)} items={cartItems} onRemove={onRemoveItem}/>}
            <Header onClockCart={() => setCardOpened(true)}/>
            <Routes>
                <Route path={"/"} element={<Home items={items}
                                                 cartItems={cartItems}
                                                 searchValue={searchValue}
                                                 setSearchValue={setSearchValue}
                                                 onChangeSearchInput={onChangeSearchInput}
                                                 onAddToCart={onAddToCart}
                                                 onAddToFavorite={onAddToFavorite}
                                                 isLoading={isLoading}/>}/>
                <Route path={"/favorites"}
                       element={<Favorites onAddToFavorite={onAddToFavorite}/>}/>
            </Routes>


        </div>
        </AppContext.Provider>
    );
}

export default App;
