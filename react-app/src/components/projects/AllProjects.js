import React, {useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllProjects } from '../../store/projects';
import './AllProjects.css'

function AllProjects(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const projects = Object.values(useSelector(state=>state.projects))
    const allProjects = projects.filter(project=> project.userId === user.id)

    useEffect(()=>{
        dispatch(GetAllProjects())
    }, [dispatch])

    return(
        <>
            <h3 className='user-Name'>@{user.username}</h3>
            {allProjects && (allProjects.map(project=>(
                <NavLink className='project-Nav-Bar' key={project.id} to={`/projects/${project.id}`} end>
                    <div className='project-detail-Name'>{project.name}</div>
                </NavLink>
            )))}
        </>
    )
}

export default AllProjects
