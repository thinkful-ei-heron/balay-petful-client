import React from 'react';
import { Link } from 'react-router-dom';


export default class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                <h2>Adopt Don't Shop</h2>
                <img id="homepage" src="https://external-preview.redd.it/JLtYUiaURDRFT2hTf0Pwof0jNwWypdkhu8UH7vODj2U.jpg?auto=webp&s=10a88de0fc8a46abcc7f338aac92bb4448040d6b" alt="happy dog running in field"></img>
                <p>Here at FIFO Pet Rescue we take a different approach to the adoption process. Instead of picking a specific pet you would like to adopt, we pair you with a pet based on a FIFO (First in, first out) system. Each pet gets adopted in the order they came to our rescue and each adoptee gets paired with a pet in that same order. Here at FIFO Pet Rescue we believe that adopting a pet shouldn't be about the breed, age, or size - it should be about saving a life.</p>
                <p>Choose an option below to start the adoption process!</p>
                <div className="home_buttons">
                    <Link to='/dogs'><button className="adopt_start">Adopt a Dog</button></Link>
                    <Link to='/cats'><button className="adopt_start">Adopt a Cat</button></Link>
                </div>
            </div>
        )
    }
}