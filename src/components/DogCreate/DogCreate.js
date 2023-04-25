import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { createDog, getTemperaments} from "../../redux/actions/actions";
import MultiSelect from "../MultiSelect/MultiSelect";
import Navbar from '../Nav/Navbar';
import './DogCreate.css';


const DogCreate = () => {

    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments)
	const [selectedOptions, setSelectedOptions] = useState([]);

	function handleSelect(event) {
		
    	const selectedValues = [...event.target.options]
		.filter(option => option.selected)
		.map(option => option.value);

		//para controlar el multiselect, seleccionar y sacar de la selleccion
		if (!selectedOptions.includes(selectedValues[0])){
			setSelectedOptions([...selectedOptions, ...selectedValues]);
			
		}else{
			setSelectedOptions(selectedOptions.filter(option => option !== selectedValues[0]));
			
		}
  	}
	
    const [dog, setDog] = useState({
        name: "",
		height: "",
		weight: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperaments: []
    });

    useEffect(() => {
		dispatch(getTemperaments());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

    const ChangeInput = (e) => {
		if (e.target.name === 'temperaments') {
			const arr = dog[e.target.name];
			setDog({
				...dog,
				[e.target.name]: arr.concat(e.target.value),
			});
		} else {
			setDog({
				...dog,
				[e.target.name]: e.target.value,
			});
		}
	};

    const handleSubmit = (e) => {
		e.preventDefault();

		const obj = {
			name: dog.name,
			heightMin: dog.heightMin,
      		heightMax: dog.heightMax,
			weightMin: dog.weightMin,
     		weightMax: dog.weightMax,
			life_span: dog.life_span,
			image: dog.image,
			temperaments: dog.temperaments,
			
		};

        // Validaciones
		if (!obj.name) {
			alert('The name is missing.');
			return;
		}
		if (!obj.life_span) {
			alert('The life expectancy is missing.');
			return;
		}
		if (!obj.heightMin) {
			alert('The Heigth minimun is missing.');
			return;
		}
        if (!obj.heightMax) {
			alert('The Heigth maximun is missing.');
			return;
		}
        if (!obj.weightMin) {
			alert('The Weigth minimun is missing.');
			return;
		}
        if (!obj.weightMax) {
			alert('The Weigth maximun is missing.');
			return;
		}
		if (obj.heightMin > obj.heightMax) {
			alert('The minimum Height cannot be greater than the maximum Height..');
			return;
		}
        if (obj.weightMin > obj.weightMax) {
			alert('The minimum Weight cannot be greater than the maximum Weight.');
			return;
		}

		const newobj = {
			name: dog.name,
			height: dog.heightMin + " - " + dog.heightMax,
			weight: dog.weightMin + " - " + dog.weightMax,
			life_span: dog.life_span + " years",
			temperaments: selectedOptions,
			image: dog.image
		};

		dispatch(createDog(newobj));
		e.target.reset();
		alert('Dog created correctly !');

        setDog({
            name: "",
			height: "",
			weight: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            life_span: "",
            image: "",
            temperaments: []
        })

    };

    return (
        <div className="container-dog">
            <Navbar showSearch={false}/>
            <h1>Create DOG</h1>
            <h3>Complete the characteristics of your new dog:</h3>
            <form id='principal-form'
				className='form'
				noValidate
				onChange={(e) => ChangeInput(e)}
				onSubmit={(e) => handleSubmit(e)}>
                <div>
					<div>
						<div className='divTitles'>
							<div>
								<label><strong>Name: </strong></label>
								<input
									className='label'
									type='text'
									name='name'
									value={dog.name}
								></input>
							</div>
                            <div>
								<label><strong>Height: Minimun: </strong></label>
								<input
									className='label'
									type='text'
									name='heightMin'
									value={dog.heightMin}
								></input>
                				<label><strong> Maximun: </strong></label>
								<input
									className='label'
									type='text'
									name='heightMax'
									value={dog.heightMax}
								></input>
							</div>
                			<div>
								<label><strong>Weight: Minimun: </strong></label>
								<input
									className='label'
									type='text'
									name='weightMin'
									value={dog.weightMin}
								></input>
                				<label><strong> Maximum: </strong></label>
								<input
									className='label'
									type='text'
									name='weightMax'
									value={dog.weightMax}
								></input>
							</div>
               				 <div>
								<label><strong>Life Span: </strong></label>
								<input
									className='label'
									type='text'
									name='life_span'
									value={dog.life_span}
								></input>
							</div>
              			</div>
              			<div className='imagediv'>
							<label><strong>Image URL: </strong></label>
							<input
								className='imagein'
								type='text'
								name='image'
								value={dog.image}
							></input>
						</div>
            		</div>
            		<div className='checkboxs'>
						<div className='checks'>
							<label><strong>Temperaments: </strong></label>
							<div className="app">
								<div className="dropdown-container">
									<MultiSelect 
										options={temperaments}
										onChange={handleSelect}
										selectedOptions={selectedOptions}
									/>
								</div>
							</div>
						</div>
					</div>
        		</div>
          		<button className='button' type='submit'>
						CREATE!
				</button>
            </form>
      </div>
    )
}

export default DogCreate