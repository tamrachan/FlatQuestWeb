// import React from "react";
import "../css/Popup.css"

function Popup(props) {
    return (props.winnerProp) ? ( // okay great it owrs! props.winnderprop brings winnerprop, if there was other properties, props.propertyname could bring that! simples!
        <div className="popup">

            <div className="popupInner">

                <h1>hello popup? {props.winnerProp} is me </h1>

                <button>x</button>
                { props.children }

            </div>

        </div>
    ) : null;
}

export default Popup