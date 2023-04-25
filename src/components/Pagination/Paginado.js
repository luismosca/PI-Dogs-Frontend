/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Paginado.css";

export default function Paginado({dogsPerPage, dogSearch, allDogs, paginado, paginaActual, dogsFiltered}){
  const pageNumbers = []
  if (dogSearch){
    for (let i=1; i<=Math.ceil(dogSearch/dogsPerPage); i++){
      pageNumbers.push(i)
    }
  }else if(dogsFiltered) {
    for (let i=1; i<=Math.ceil(dogsFiltered/dogsPerPage); i++){
      pageNumbers.push(i)
    }
  }else{
    for (let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
      pageNumbers.push(i)
    }
  }
  
  return (
    <nav>
      <ul className="paginado">
        {paginaActual > 1 && <li className="ant-pag"><button onClick={() =>
           paginado(paginaActual-1)}>Previus</button></li>}
        <li className="pag-actual">{paginaActual}</li>
        <li className="cant-paginas">from  {pageNumbers.length}</li>
        {paginaActual < pageNumbers.length && <li className="sig-pag"><button onClick={() =>
           paginado(paginaActual+1)}>Next</button></li>}
      </ul>
    </nav>
  ) 
}
