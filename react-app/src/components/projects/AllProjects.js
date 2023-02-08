import React, {useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllProjects } from '../../store/projects';
// import AddProjectModal from './AddProjectModal';
import './AllProjects.css'

function AllProjects(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const projects = useSelector(state=>state.projects)
    const allProjects = Object.values(projects).filter(project=> project.userId === user.id)

    useEffect(()=>{
        dispatch(GetAllProjects())
    }, [dispatch])

    return(
        <>
        <h3 className='user-Name'>@{user.username}</h3>
        {/* <div className='add-Project'>+</div> */}
        {allProjects && (allProjects.map(project=>(
            // <Link className='project-detail'  key={project.id} to={`/projects/${project.id}`}>{project.name}</Link>
            <NavLink activeClassName={'project-detail'} className='project-detail-nav-Bar' key={project.id} to={`/projects/${project.id}`}>
                <div className='project-detail-Name'>{project.name}
                </div>
            </NavLink>
        )))}
        </>
    )
}

export default AllProjects
