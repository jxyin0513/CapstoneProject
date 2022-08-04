import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllProjects } from '../../store/projects';

function AllProjects(){
    const dispatch = useDispatch()
    const projects = useSelector(state=>state.projects)
    const allProjects = Object.values(projects)

    useEffect(()=>{
        dispatch(GetAllProjects())
    }, [dispatch])

    return(
        <>
        {projects && (allProjects.map(project=>(
            <li key={project.id}>{project.name}</li>
            // <div ></div>
        )))}
        </>
    )
}

export default AllProjects
