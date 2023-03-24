import React from 'react';
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader";
import {AppContext} from "../../App";


const Card = ({
                  onClickAddItem,
                  onClickFavorite,
                  id, title, price,
                  imageUrl,
                  favorite = false,
                  loading = false
              }) => {
    const {isItemAdded} = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorite)

    const onClickHandler = () => {
        onClickAddItem({id, title, price, imageUrl})

    }

    const onClickFavoriteButton = () => {
        onClickFavorite({id, title, price, imageUrl})
        setIsFavorite(!isFavorite)
    }
    return (
        <div className={styles.card}>
            {
                loading ? (<ContentLoader
                        speed={2}
                        width={165}
                        height={250}
                        viewBox="0 0 155 265"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"
                    >
                        <rect x="0" y="0" rx="10" ry="10" width="155" height="155"/>
                        <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
                        <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
                        <rect x="0" y="234" rx="5" ry="5" width="80" height="25"/>
                        <rect x="124" y="230" rx="10" ry="10" width="35" height="32"/>
                    </ContentLoader>)
                    : (
                        <>
                            {onClickFavorite && (
                                <div className={styles.favorite} onClick={onClickFavoriteButton}>
                                    <img src={isFavorite ? '/img/button_like.svg' : '/img/button_unliked.svg'}
                                         alt="Unliked"/>
                                </div>
                            )}
                            <img width="100%" height={135} src={imageUrl} alt="Sneakers"/>
                            <h5>{title}</h5>
                            <div className="d-flex justify-between align-center">
                                <div className="d-flex flex-column">
                                    <span>Цена: </span>
                                    <b>{price} руб.</b>
                                </div>
                                {onClickAddItem && (
                                    <img className={styles.plus}
                                         onClick={onClickHandler}
                                         src={isItemAdded(id) ? "/img/button_checked.svg" : "/img/add.svg"}
                                         alt="button plus"
                                    />
                                )}
                            </div>
                        </>
                    )}
        </div>
    );
};

export default Card;