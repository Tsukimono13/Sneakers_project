import Card from "./components/card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import React from 'react';

function App() {
    const [items, setItems]= React.useState([])
    const [cartItems, setCartItems]= React.useState([])
    const [cardOpened, setCardOpened] = React.useState(false)

    React.useEffect(()=>{
        fetch("https://6404f98640597b65de2e5997.mockapi.io/items")
            .then((res)=>{
                return res.json()
            })
            .then(json => {
                setItems(json)
            })
    },[])

    const onAddToCart = (obj) => {
        setCartItems(prev =>[...prev, obj])
    }
    return (
        <div className="wrapper clear">
            {cardOpened && <Drawer onClose={()=>setCardOpened(false)} items={cartItems}/>}
            <Header onClockCart={()=>setCardOpened(true)}/>
            <div className='content p-40'>
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src='/img/search.svg' alt="Sneakers"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map((card) => (
                        <Card key={card.id}
                              title={card.name}
                              price={card.price}
                              imageUrl={card.imageUrl}
                              onClickAddItem={(obj)=>{
                                  onAddToCart(obj)}}
                              onClickFavorite={()=>{alert('favorite')}}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
