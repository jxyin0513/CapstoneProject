import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllProjects from './projects/AllProjects';
import logo from './image/Asanalist-logos.jpeg';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state=>state.session.user)

  return (
    <nav className={user? 'Nav-Bar':'noUser-Nav-Bar'}>
      <div className='nav-Bar-container'>
        <div className='nav-Bar-Header'>
          <NavLink to='/' exact={true} activeClassName='home-Logo'>
            <img src={logo} className='logo' height='50px' width='auto' alt='Site Logo'></img>
          </NavLink>
          {/* {user &&
            <LogoutButton />
          } */}
        </div>

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
            <div className='home-nav-Page'>
              <NavLink to='/' exact={true} className='home-Button' activeClassName='home-page-act-Button'>
                <i className="fa-solid fa-house"></i>  Home
              </NavLink>
            </div>
            <div className='my-tasks-outer'>
              <NavLink to='/tasks' exact={true} id='my-tasks-Button' activeClassName='my-tasks-Button'>
                <i className="fa-solid fa-list-ul"></i>  My Tasks
              </NavLink>
            </div>
            <div className='all-projects-Profile'>
              <AllProjects />
            </div>
          </div>
        )}


      </div>
    </nav>

  );
}

export default NavBar;
