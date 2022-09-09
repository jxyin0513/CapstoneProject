import React from 'react';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import Search from './search/search';
import './TopBar.css'

function TopBar(){
    return (
        <div className='top-Bar'>
            <Search />
        </div>
    )
}
export default TopBar;
