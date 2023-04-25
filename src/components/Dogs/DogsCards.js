import React from "react";
import '../Dogs/DogsCards.css'
import { NavLink } from 'react-router-dom'


const DogCards = (props) => {
    
    return (
        <div className="cards" style={{backgroundImage: `url(${props.image})`}}>
            <div className="dog-info-container">
                <div className="black-box">
                    <div className="info-container">
                        <h3>{props.name}</h3>
                        <h3>{props.temperament}</h3>
                        <h3>{props.weight !== "NaN" ? props.weight : "5"} Kg.</h3>
                    </div>
                <div className="div-button">
                    {props.id && (
                        <NavLink to={`/breeds/${props.id}`}>
                            <button className="Link">Dog Details</button>
                        </NavLink>
                        )}
                    </div>
                </div>
            </div>
        </div>
            
    )
}

export default DogCards
