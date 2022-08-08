
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from './auth/LogoutButton';
import AddTaskModal from './tasks/TaskModal';
// import NewProject from './projects/AddProject';
// import AddTask from './tasks/AddTask';
import AllProjects from './projects/AllProjects';
import './NavBar.css'

const NavBar = () => {
  const user = useSelector(state=>state.session.user)

  return (
    <nav className={user? 'Nav-Bar':'noUser-Nav-Bar'}>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {!user && (
          <div>
            <li>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </li>
          </div>
        )}

        {user && (
          <div>
            <li>
              <NavLink to='/users' exact={true} activeClassName='active'>
                Users
              </NavLink>
            </li>
            <li>
              <AddTaskModal />
            </li>
            <li>
              <LogoutButton />
            </li>
            <AllProjects />
          </div>
        )}


      </ul>
    </nav>
  );
}

export default NavBar;
