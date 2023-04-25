import React from "react";
//import { Link } from 'react-router-dom'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import SearchBar from "../SearchBar/SearchBar";

const Navbar = (props) => {

    return (
        <div>
            <div className="navbar-div">
                {props.showSearch && <SearchBar setCurrentPage={props.setCurrentPage}/>}
                <NavLink to="/home"><button>Home</button></NavLink>
                <NavLink to='/dogcreate'><button>Create Dog</button></NavLink>   
                <NavLink to="/about"><button>About</button></NavLink>  
            </div>
        </div>
    )
}

export default Navbar
