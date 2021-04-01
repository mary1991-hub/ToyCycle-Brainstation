import React from 'react';
import "./OfferModule.scss";


function OfferModule(props) {
    return (
        <>
            <span className="offer-module--grey-background"></span>
                
            <div className="offer-module">
            <input type="button" onClick={props.cancelOfferModule} className="offer-module__close"/>
                <div>
                    <p className="offer-module__header" > Offer for {props.posts.name}</p>
                    <img src={`http://localhost:8080/images/${props.posts.images}`}/>
                </div>
                <div className="offer-module__btn">
                <button onClick={props.proposeOfferModule} className="offer-module__btn-offer">Offer</button>
                    <button onClick={props.cancelOfferModule} className="offer-module__btn-cancel"> Cancel</button>
                </div>
            </div>
        </>
    );
}

export default OfferModule;