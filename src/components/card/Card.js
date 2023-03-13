import React from 'react';
import styles from './Card.module.scss'

const Card = ({onClickAddItem, onClickFavorite, title, price, imageUrl}) => {
    const [isAdded, setIsAdded] = React.useState(false)
    const [isFavorite, setIsFavorite] = React.useState(false)

    const onClickHandler = () => {
        onClickAddItem({title, price, imageUrl})
        setIsAdded(!isAdded)
    }

    const onClickFavoriteButton = () => {
        onClickFavorite({title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavoriteButton}>
                <img src={isFavorite ? '/img/button_like.svg' : '/img/button_unliked.svg'} alt="Unliked"/>
            </div>
            <img width={133} height={112} src={imageUrl} alt="Sneakers"/>
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={onClickHandler}
                     src={isAdded ? "/img/button_checked.svg" : "/img/add.svg"} alt="button plus"/>
            </div>
        </div>
    );
};

export default Card;