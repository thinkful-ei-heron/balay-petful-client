import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return (
            <>
            <h1>FIFO Pet Rescue</h1>
            <ul className="nav_links">
                <Link to='/'><li>Home</li></Link>
                <Link to='/dogs'><li>Our Dogs</li></Link>
                <Link to='/cats'><li>Our Cats</li></Link>
                <Link to='/success_stories'><li>Success Stories</li></Link>
            </ul>
            </>
        )
    }
}