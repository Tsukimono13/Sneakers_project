import React from 'react';
import styles from './Card.module.scss'

const Card = (props) => {
    const [isAdded, setIsAdded] = React.useState(false)

    const onClickHandler = () => {
        setIsAdded(!isAdded)
    }
    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={props.onClickFavorite}>
                <img src='/img/button_unliked.svg' alt="Unliked"/>
            </div>
            <img width={133} height={112} src={props.imageUrl} alt="Sneakers"/>
            <h5>{props.title}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена: </span>
                    <b>{props.price} руб.</b>
                </div>
                    <img className={styles.plus} onClick={onClickHandler} src={isAdded ? "/img/button_checked.svg" : "/img/add.svg"} alt="button plus"/>
            </div>
        </div>
    );
};

export default Card;