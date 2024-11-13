import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Search from './search/search';
import LogoutButton from './auth/LogoutButton';
import logo from './image/Asanalist-logos.jpeg';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state=>state.session.user)

  return (
    <nav className='nav-Bar-Outer'>
      {/* <div className='nav-Bar-container'></div> */}
        {/* <div className='nav-Bar-Header'>
          <NavLink to='/' exact="true" activeclassname='home-Logo'>
            <img src={logo} className='logo' height='50px' width='auto' alt='Site Logo'></img>
          </NavLink>
        </div> */}
        {user?
          <div className='nav-Bar-Header-Login'>
              <NavLink to='/' className='home-Logo'>
                  <img src={logo} className='logo' height='50px' width='auto' alt='Site Logo'></img>
              </NavLink>
              <Search />
              <LogoutButton />
          </div>:
            <div className='nav-Bar-Header'>
              <div>
                <NavLink to='/' end className='home-Logo'>
                  <img src={logo} className='logo' height='50px' width='auto' alt='Site Logo'></img>
                </NavLink>
              </div>
              <div>
                <NavLink to='/login' end activeclassname='active'>
                  <button className='login-Button'>Login</button>
                </NavLink>
                <NavLink to='/sign-up' end activeclassname='active'>
                  <button className='signup-Button'>Sign Up</button>
                </NavLink>
              </div>
            </div>
        }
    </nav>

  );
}

export default NavBar;
