import React, {useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllProjects } from '../../store/projects';
import './AllProjects.css'

function AllProjects(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const projects = useSelector(state=>state.projects)
    const allProjects = Object.values(projects).filter(project=> project.userId === user.id)
    // const [click, setClick] = useState(false)

    useEffect(()=>{
        dispatch(GetAllProjects())
    }, [dispatch])

    return(
        <>
        <h3>@{user.username}</h3>
        {projects && (allProjects.map(project=>(
            // <Link className='project-detail'  key={project.id} to={`/projects/${project.id}`}>{project.name}</Link>
            <NavLink activeClassName={'project-detail'} activeStyle={{textDecoration:"none"}} key={project.id} to={`/projects/${project.id}`}>{project.name}</NavLink>

            // <li key={project.id}>{project.name}</li>
            // <div ></div>
        )))}
        </>
    )
}

export default AllProjects
