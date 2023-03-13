import Card from "./components/card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from 'react';
import axios from "axios";

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
    }, [])

    const onAddToFavorite = (obj) => {
        axios.post("https://6404f98640597b65de2e5997.mockapi.io/favorite", obj);
        setCartItems(prev => [...prev, obj])
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
            <div className='content p-40'>
                <div className="d-flex align-center justify-between mb-40">
                    <h1>{searchValue ? `Поиск по запросу:"${searchValue}"` : "Все кроссовки"}</h1>
                    <div className="search-block d-flex">
                        <img src='/img/search.svg' alt="Sneakers"/>
                        {searchValue &&
                            <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/button_x.svg"
                                 alt="Remove"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.filter((item) => item.name.toLowerCase().includes(searchValue)).map((item, index) => (
                        <Card key={index}
                              title={item.name}
                              price={item.price}
                              imageUrl={item.imageUrl}
                              onClickAddItem={(obj) => {
                                  onAddToCart(obj)
                              }}
                              onClickFavorite={onAddToFavorite}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
