import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { GetProjectDetail } from '../../store/projects';
import { GetAllTasks } from '../../store/tasks';

function Project(){
    const dispatch = useDispatch();
    const {projectId} = useParams()
    const project = useSelector(state=>state.projects[projectId])
    const alltasks = useSelector(state=>state.tasks)
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(alltasks).filter(task=> task.userId === user.id)
    const projectTask = Object.values(tasks).filter(task => task.projectId === Number(projectId))

    useEffect(()=>{
        dispatch(GetProjectDetail(projectId))
        dispatch(GetAllTasks())
    }, [dispatch, projectId])

    return (
        <>
        {
            project && (
                <p>{project.name}</p>
            )
        }
        {
            projectTask && projectTask.map(task=>(
                <div key={task.id}>
                    <li>{task.assignee}</li>
                    <li>{task.taskName}</li>
                    <li>{task.status}</li>
                    <li>{task.deadline}</li>
                </div>
            ))
        }
        </>
    )
}

export default Project;
