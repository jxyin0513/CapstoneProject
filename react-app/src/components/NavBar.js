
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import AllProjects from './projects/AllProjects';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state=>state.session.user)

  return (
    <nav className={user? 'Nav-Bar':'noUser-Nav-Bar'}>
      <div className='nav-Bar-container'>
        <NavLink to='/' exact={true} activeClassName='home-Logo'>
          <img src='/image/Asanalist-logos.jpeg' className='logo' height='50px' width='auto' alt='Site Logo'></img>
        </NavLink>
        {user &&
        <NavLink to='/' exact={true} activeClassName='home-Button'>
          <i className="fa-solid fa-house"></i>Home
        </NavLink>}

        {!user && (
          <div>
            <NavLink to='/login' exact={true} activeClassName='active'>
              <button className='login-Button'>Login</button>
            </NavLink>

            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button className='signup-Button'>Sign Up</button>
            </NavLink>
          </div>
        )}

        {user && (
          <div>
            <div>
              <NavLink to='/tasks' exact={true} activeClassName='tasks-Button'>
                <i className="fa-solid fa-list-ul"></i>My Tasks
              </NavLink>
            </div>
            <div>
              <LogoutButton />
            </div>
            <AllProjects />
          </div>
        )}


      </div>
    </nav>

  );
}

export default NavBar;
