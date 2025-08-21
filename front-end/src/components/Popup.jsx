// import React from "react";
import "../css/Popup.css"
import { useNavigate } from "react-router-dom";

function Popup(props) {
    const navigate = useNavigate();

    return (props.winnerProp) ? ( // okay great it owrs! props.winnderprop brings winnerprop, if there was other properties, props.propertyname could bring that! simples!
        <div className="popup">

            <div className="popupInner">

                <h1>Winner: {props.winnerProp} !!! </h1>

                <button onClick={() => navigate("/flatpage")}>x</button> {/* or to games where it changes score, tho idk what scores for */}
                { props.children }

            </div>

        </div>
    ) : null;
}

export default Popup