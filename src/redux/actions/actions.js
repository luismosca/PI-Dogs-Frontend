import axios from "axios";

// declaro variables para las action types.
export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTES";
export const CREATE_DOG = "CREATE_DOG";
export const FILTER_BY_TEMPERAMENT = "FILTER_BY_TEMPERAMENT"
export const ORDER_BY_NAME = "ORDER_BY_NAME"
export const CLEAR_ALL = "CLEAR_ALL"

//* Trae todos los dogs (DB + API)
export function getAllDogs() {
  return async function (dispatch) {
      return await axios.get('http://localhost:3001/breeds')
      .then((allDogs) => {
          dispatch({ type: GET_ALL_DOGS, payload: allDogs.data })})
      .catch((err) => {
          return err;
      });
  };
}

// detalles del dog por pasado por:ID
export function getDogDetail(id) {
  return async function (dispatch) {
    return await axios.get(`http://localhost:3001/breeds/${id}`)
    .then((detail) => {
      dispatch({ type: GET_DOG_DETAILS, payload: detail.data }); 
      })
      .catch((err) => {
        return err;
      });
      
  };
  
}
// obtengo el dog por nombre
export function getDogByName(name) {
  return function (dispatch) {
    return axios.get(`http://localhost:3001/breeds?name=${name}`)
      .then((dogName) => {
        dispatch({ type: GET_DOG_BY_NAME, payload: dogName.data });
      })
      .catch((err) => {
        return err;
      });
  };
}

//* Trae todos los TEMPERAMENTOS
export function getTemperaments() {
  return function (dispatch) {
    axios
      .get(`http://localhost:3001/temperaments`)
      .then((res) => {
        dispatch({ type: GET_TEMPERAMENTS, payload: res.data });
      })
      .catch((err) => {
        return err;
      });
  };
}
// funcion para crear un nuevo Dog
export function createDog(dogs){
  return async function(){
      const response = await axios.post('http://localhost:3001/dogcreate', dogs)
      return response
  }
}

// Ordenamiento
export function orderByName(order) {
  return async function (dispatch) {
    dispatch({ type: ORDER_BY_NAME, payload: order });
  };
}

// Filtrado
export function filterByTemperament(filtro) { 
  return async function (dispatch) {
    dispatch({ type: FILTER_BY_TEMPERAMENT, payload: filtro });
  };
}
// para limpiar pagina de todo
export const clearAll = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ALL,
    });
  };
};


