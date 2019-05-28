import React from 'react';
import './CartItem.css'

const cartItem = (props) => {
    return(
        <div className="cart-item">
            <img src={props.img} alt=""/>
            <h3 className="col-5">{props.title}</h3>
            <div className="col-4 float-left">
                <div className="input-group mb-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text btn" onClick={props.plusClick}>+</div>
                    </div>
                    <input type="number" className="form-control" id="inlineFormInputGroup" value={props.amount} onChange={props.change}/>
                    <div className="input-group-append">
                        <div className="input-group-text btn" onClick={props.minusClick}>-</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default cartItem;