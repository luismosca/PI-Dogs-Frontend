import {React, useState} from 'react'
import { useDispatch } from 'react-redux'
import { getDogByName } from '../../redux/actions/actions'
import './SearchBar.css'


export default function SearchBar({setCurrentPage}) {
    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleInputChange = (event) => {
      event.preventDefault()
      setName(event.target.value);
    }

    const handleOnClick = (event) => {
      event.preventDefault()
      const currentUrl = new URL(window.location.href); // La URL actual (sin query parameter)
      const queryParams = new URLSearchParams(currentUrl.search) // La URL con algun query param (si existe)
      queryParams.set("search", name)
      currentUrl.search = queryParams.toString();
      window.history.pushState({}, '', currentUrl.toString());
      dispatch(getDogByName(name));
      setCurrentPage(1)
    }
 
    return (
      <div className="searchbar-div">
        <input
          className="bar-btn"
          name="buscar"
          placeholder="Dog Name..."
          onChange={(event) => handleInputChange(event)}
          value={name}
          autoComplete="off"
        ></input>
        <button className="btn" onClick={(event) => handleOnClick(event)}>
          Search Dog
        </button>
      </div>
    );
}



