import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTasks } from '../../store/tasks';

function Task(){
    const dispatch = useDispatch()
    const tasks = useSelector(state=>state.tasks)
    const allTasks = Object.values(tasks)

    useEffect(()=>{
        dispatch(GetAllTasks())
    }, [dispatch])

    return (
        <>
        {allTasks && allTasks.map(task=>(
            <div key={task.id}>
                <li>{task.taskName}</li>
                <li>{task.assignee}</li>
                <li>{task.status}</li>
                <li>{task.deadline}</li>
                <li>{task.priority}</li>
            </div>
        ))}
        </>
    )
}

export default Task;
