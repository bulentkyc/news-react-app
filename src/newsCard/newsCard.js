import React from 'react';
import './newsCard.css';

const newsCard = (props) => {
    return (
        <div className="newsCard">
            <img src={props.img} alt='crashed'/>
            <h2>{props.title}</h2>
        </div>
    );
}

export default newsCard;