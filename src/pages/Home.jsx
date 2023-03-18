import React from 'react';
import Card from "../components/card/Card";

const Home = ({items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite}) => {
    return (
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
                {items.filter((item) => item.title.toLowerCase().includes(searchValue)).map((item, index) => (
                    <Card key={index}
                          {...item}
                          onClickAddItem={(obj) => {
                              onAddToCart(obj)
                          }}
                          onClickFavorite={onAddToFavorite}/>
                ))}
            </div>
        </div>
    );
};

export default Home;