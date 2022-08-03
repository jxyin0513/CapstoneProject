import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

function AllProjects(){
    const projects = useSelector(state=>state.projects)


    return(
        <>
        {projects && projects.map(project=>(
            <div>{project.projectName}</div>
        ))}
        </>
    )
}

export default AllProjects
