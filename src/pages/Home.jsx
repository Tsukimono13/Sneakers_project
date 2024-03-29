import React from 'react';
import Card from "../components/card/Card";
import Search from ".//../assets/img/search.svg";
import X_button from ".//../assets/img/button_x.svg";


const Home = ({
                  items,
                  searchValue,
                  setSearchValue,
                  onChangeSearchInput,
                  onAddToCart,
                  onAddToFavorite,
                  cartItems,
                  isLoading
              }) => {

    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
        return (
            isLoading ? [...Array(12)] : filteredItems)
            .map((item, index) => (
                <Card key={index}
                      {...item}
                      loading={isLoading}
                    //added={isItemAdded(item && item.id)}
                      onClickAddItem={(obj) => {
                          onAddToCart(obj)
                      }}
                      onClickFavorite={onAddToFavorite}/>
            ))
    }
    return (
        <div className='content p-40'>
            <div className="d-flex align-center justify-between mb-40">
                <h1>{searchValue ? `Поиск по запросу:"${searchValue}"` : "Все кроссовки"}</h1>
                <div className="search-block d-flex">
                    <img src={Search} alt="Sneakers"/>
                    {searchValue &&
                        <img onClick={() => setSearchValue('')} className="clear cu-p" src={X_button}
                             alt="Remove"/>}
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..."/>
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderItems()}
            </div>
        </div>
    );
};

export default Home;