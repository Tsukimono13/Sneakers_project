import Card from "./components/card/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

const arr = [{name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: "12 999", imageUrl: '/img/sneakers/1.jpg'},
    {name: 'Мужские Кроссовки Nike Air Max 270', price: "12 999", imageUrl: '/img/sneakers/2.jpg'},
    {name: 'Кроссовки Puma X Aka Boku Future Rider', price: "8 999", imageUrl: '/img/sneakers/3.jpg'},
    {name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: "8 499", imageUrl: '/img/sneakers/4.jpg'}]

function App() {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className='content p-40'>
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src='/img/search.svg' alt="Sneakers"/>
                        <input placeholder="Поиск..."/>
                    </div>
                </div>
                <div className="d-flex">
                    {arr.map((card) => (
                        <Card key={card.id}
                              title={card.name}
                              price={card.price}
                              imageUrl={card.imageUrl}
                              onClickAddItem={()=>{alert('add')}}
                              onClickFavorite={()=>{alert('favorite')}}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
