import Drawer from "./components/drawer/Drawer";
import React from 'react';
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Header from "./components/Header";

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
            try {
                const cartResponse = await axios.get("https://6404f98640597b65de2e5997.mockapi.io/cart")
                const favoritesResponse = await axios.get("https://64620a1a185dd9877e497318.mockapi.io/favorites")
                const itemsResponse = await axios.get("https://64620a1a185dd9877e497318.mockapi.io/items")
                setIsLoading(false)
                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при запросе данных :(')
                console.error(error)
            }

        }

        fetchData()
    }, [])

    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
                axios.delete(`https://64620a1a185dd9877e497318.mockapi.io/favorites/${obj.id}`);
                setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
            } else {
                const {data} = await axios.post(
                    `https://64620a1a185dd9877e497318.mockapi.io/favorites`, obj);
                setFavorites((prev) => [...prev, data])
            }
        } catch (error) {
            alert('Не удалось добавть в закладки')
            console.error(error)
        }

    }
    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj])
                const {data} = await axios.post("https://6404f98640597b65de2e5997.mockapi.io/cart", obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    }),
                );
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину')
            console.error(error)
        }
    }
    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://6404f98640597b65de2e5997.mockapi.io/cart/${id}`);
            setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (error) {
            alert('Ошибка из удалении из корзины')
            console.error(error)
        }

    }

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value)
    }
    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
    }
    return (
        <AppContext.Provider
            value={{items, favorites, cartItems, onAddToCart, isItemAdded, setCardOpened, setCartItems}}>
            <div className="wrapper clear">
                <Drawer onClose={() => setCardOpened(false)} items={cartItems} onRemove={onRemoveItem}
                        opened={cardOpened}/>
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
                    <Route path={"favorites"}
                           element={<Favorites onAddToFavorite={onAddToFavorite}/>}/>
                    <Route path={"orders"}
                           element={<Orders/>}/>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
