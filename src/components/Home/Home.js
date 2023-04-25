import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../components/Nav/Navbar';
import DogsCards from "../Dogs/DogsCards";
import { getAllDogs, getDogByName, clearAll } from "../../redux/actions/actions";
import '../Home/Home.css'
import Paginado from "../Pagination/Paginado";
import FilteredBy from '../../components/Filter/Filter';

const Home = () => {
    const dispatch= useDispatch()
    
    //defino todos los estados de los Dogs
    const error = useSelector(state=>state.error)
    const allDogs = useSelector(state=>state.allDogs)
    const dogSearch = useSelector(state=>state.dogSearch)
    const filteredDogs = useSelector(state=>state.filteredDogs)
    
    //lo siguiente para determinar en que ruta estoy parado, si la home o la del search
    const queryParams = new URLSearchParams(window.location.search)
    const [queryParam, setQueryParam] = useState(queryParams.get("search") ? queryParams.get("search") : "home")
    
    //Set pages en 8
    //estado para las paginas
    const [currentPage, setcurrentPage] = useState(1)
    const [dogsPerPage, setdogsPerPage] = useState(8)
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    let currentDogs = []
    let currentSDogs = []
    
    //pregunto si hay algo en filterDogs para determinar si son todos los dogs o los del Search
    filteredDogs.length ? currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog) :
        currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    filteredDogs.length ? currentSDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog) : 
        currentSDogs = dogSearch.slice(indexOfFirstDog, indexOfLastDog)

    //Funcion de Paginado
    const paginado = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(clearAll());
        dispatch(getAllDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(clearAll());
        setQueryParam("home")
        if (queryParams.get("search")) {
            dispatch(getDogByName(queryParams.get("search")))
            setQueryParam(queryParams.get("search"))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams.get("search")]) 

    if(error){
        return(
        <>
        <p>{error}</p>
        </>
        )
    }else if(dogSearch.length && queryParam !== "home"){
        return (
            <>
            <Navbar
                setCurrentPage={setcurrentPage}
                showSearch={true}/>
            <h3>Search - Dogs</h3>
            <FilteredBy 
                setCurrentPage={setcurrentPage}
            />
            <Paginado
                dogsPerPage={dogsPerPage}
                dogSearch={dogSearch.length}
                paginado = {paginado}
                paginaActual = {currentPage}
                dogsFiltered = {filteredDogs.length}
                />
            <div className="cardContainer">
                {currentSDogs.map(dog=>{
                    return <DogsCards
                    id={dog.id}
                    name={dog.name}
                    temperament={dog.temperament? dog.temperament.split(", ").slice(0, 5).join(", ") : dog.temperament}
                    weight={dog.weight}
                    image={dog.image}
                    key={dog.id}
                    />
                    })
                }
            </div>
            <Paginado
                dogsPerPage={dogsPerPage}
                dogSearch={dogSearch.length}
                paginado = {paginado}
                paginaActual = {currentPage}
                dogsFiltered = {filteredDogs.length}
                />
            </>
        )
    } else if(allDogs.length){
        
        return (
            <>
            <Navbar
                setCurrentPage={setcurrentPage}
                showSearch={true}/>
            <h3>Home - Dogs</h3>
            <FilteredBy 
                setCurrentPage={setcurrentPage}
            />
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado = {paginado}
                paginaActual = {currentPage}
                dogsFiltered = {filteredDogs.length}
                />
            <div className="cardContainer">
                {currentDogs.map(dog=>{
                    return <DogsCards
                    id={dog.id}
                    name={dog.name}
                //    temperament={dog.temperament.split(", ").slice(0, 5).join(", ")}
                    temperament={dog.temperament? dog.temperament.split(", ").slice(0, 5).join(", ") : dog.temperament}    
                    weight={dog.weight}
                    image={dog.image}
                    key={dog.id}
                    />
                    })
                }
                
            </div>
            <Paginado
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado = {paginado}
                paginaActual = {currentPage}
                dogsFiltered = {filteredDogs.length}
                />
            </>
        )
    } else{
        return(
            <div className="MyPage">
                <div className="load">
                    <h3>Loading...</h3>
                </div>
            </div>
        )
    }

    
}

export default Home
