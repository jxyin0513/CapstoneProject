import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTasks } from '../../store/tasks';
import './AllTasks.css'

function AllTasks(){
    const dispatch = useDispatch()
    const tasks = useSelector(state=>state.tasks)
    const allTasks = Object.values(tasks)
    console.log(allTasks)

    useEffect(()=>{
        dispatch(GetAllTasks())
    }, [dispatch])

    return (
        <div className='all-Tasks'>
            {allTasks && allTasks.map(task=>(
                <div key={task.id}>
                    <li>{task.taskName}</li>
                    <li>{task.assignee}</li>
                    <li>{task.status}</li>
                    <li>{task.deadline}</li>
                    <li>{task.priority}</li>
                </div>
            ))}
        </div>
    )
}

export default AllTasks;
