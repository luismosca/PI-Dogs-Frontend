import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux'
import { getTemperaments, filterByTemperament, orderByName, clearAll } from '../../redux/actions/actions';
import './Filter.css';

function FilteredBy({temperaments, setCurrentPage}) {
	const dispatch = useDispatch();

	const handleSelect = (e) => {
		e.preventDefault(); 
		dispatch(filterByTemperament(e.target.value))
		setCurrentPage(1)
	}

	const handleSelect2 = (e) => {
		e.preventDefault(); 
		dispatch(orderByName(e.target.value))
		setCurrentPage(1)
	}

	const handleButton = (e) => {
		window.location.reload()
		e.preventDefault()
		dispatch(clearAll())
		
	}

	useEffect(() => {
		dispatch(getTemperaments());
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
			<div>
				<div className='cargar'>
					<button onClick={handleButton}>Refresh Page</button>
				</div>
				<div className='container-div'>
				<div><strong><u>FILTERS:</u></strong>
					<select  className="selectCont" onChange={handleSelect} name="" id="">
						<option className="option" value="default">ALL DOGS...</option>
						<optgroup className="optionGroup" label="DATA-BASE">
							<option className="option" value="db">MY DOGS</option>
						</optgroup>
							<optgroup className="optionGroup" label="API">
								<option className="option" value="api">API</option>
							</optgroup>              
							<optgroup className="optionGroup" label="TEMPERAMENTS">
								{temperaments && temperaments.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
							</optgroup>              
						</select>
						</div>
						<div><strong><u>ORDERING:</u></strong>
						<select  className="selectCont" onChange={handleSelect2} name="" id="">
								<option className="option" value="default">ORDER...</option>
								<optgroup className="optionGroup" label="Weight">
										<option className="option" value="asc">higher to lower weight</option>
										<option className="option" value="desc">lower to higher weight</option>
								</optgroup>               
								<optgroup className="optionGroup" label="Alphabetic">
										<option className="option" value="A-Z">Name: A - Z</option>
										<option className="option" value="Z-A">Name: Z - A</option>
								</optgroup>     
						</select>
					</div>
				</div>
			</div>
	)
}

const mapStateToProps = (state) => {
	return {
		temperaments: state.temperaments
	}
}

export default connect(mapStateToProps, {orderByName, filterByTemperament})(FilteredBy)

