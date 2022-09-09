import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Search from './search/search';
import './TopBar.css'

function TopBar(){
    return (
        <div className='top-Bar'>
            <div>menu</div>
            <Search />
            <div>Log out</div>
        </div>
    )
}
export default TopBar;
