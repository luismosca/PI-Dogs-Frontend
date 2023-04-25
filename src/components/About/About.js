import React from 'react'
import NavBar from '../Nav/Navbar';
import '../About/about.css'


const About = () => {
    return (
        <>
        <div className='fondo'>
            <div>
                <NavBar showSearch={false} />
                <h1>About</h1>
            </div>
            <div className="container-about">
                <h1>Projecto Individual</h1>
                <h1>Henry DOGS</h1>
                <h1>Page about information of the different breeds of dogs in the world, with their different characteristics such as their weight, height and their temperaments.</h1>
                <h1>Luis Moscarelli 32a</h1>
                <h1>Enero 2023</h1>
            </div>
        </div>
        </>
        
    )
}

export default About

