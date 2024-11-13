import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AllProjects from './projects/AllProjects';
import './SideBar.css'

function SideBar(){
    const user = useSelector(state=>state.session.user)
    return (
        <div>
            {user && (
          <div className='side-Bar'>
            <div className='home-nav-Page'>
              <NavLink to='/' end className='home-Button' activeClassName='home-page-act-Button'>
                <i className="fa-solid fa-house"></i> Home
              </NavLink>
            </div>
            <div className='my-tasks-outer'>
              <NavLink to='/tasks' end id='my-tasks-Button' activeClassName='my-tasks-act-Button'>
                <i className="fa-solid fa-list-ul"></i> My Tasks
              </NavLink>
            </div>
            <div className='all-projects-Profile'>
              <AllProjects />
            </div>
          </div>
        )}
        </div>
    )
}
export default SideBar;
