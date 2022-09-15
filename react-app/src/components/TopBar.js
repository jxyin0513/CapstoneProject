import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './search/search';
import logo from './image/Asanalist-logos.jpeg';
import LogoutButton from './auth/LogoutButton';
import './TopBar.css'

function TopBar(){
    const user = useSelector(state=>state.session.user)
    return (
        <div>
            {user &&
            (<div className='top-Bar'>
                <NavLink to='/' exact={true} activeClassName='home-Logo'>
                    <img src={logo} className='logo' height='50px' width='auto' alt='Site Logo'></img>
                </NavLink>
                <Search />
                <LogoutButton />
            </div>
            )}
        </div>
    )
}
export default TopBar;
