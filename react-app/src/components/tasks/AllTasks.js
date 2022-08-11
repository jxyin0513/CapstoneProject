import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetAllTasks } from '../../store/tasks';
import { GetAllProjects } from '../../store/projects';
import './AllTasks.css'

function AllTasks(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(useSelector(state=>state.tasks))
    const allTasks = tasks.filter(task=>task.userId = user.id)
    const date = new Date()
    const todayTasks = allTasks.filter(task=>task.deadline === `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
    console.log(allTasks)
    const [recent, setRecent] = useState(true)
    const [today, setToday] = useState(false)
    const [week, setWeek] = useState(false)
    console.log(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,'2022-07-10',date.getFullYear(),date.getDate(), date.getMonth())
    console.log(date, new Date('August 10, 2022'))
    // function checkRecent(){
    //     if(recent)
    // }

    useEffect(()=>{
        dispatch(GetAllTasks())
        dispatch(GetAllProjects())
    }, [dispatch])

    return (
        <div className='all-Tasks'>
            <div className='all-Tasks-Header'>
                <h2>My Tasks</h2>
            </div>
            <div className='col-Bar'>
                <div className='my-Task-Names'>Task name</div>
                <div className='my-Deadline'>Due date</div>
                <div className='my-Projects'>Projects</div>
            </div>
            <h3><i id='recently-Assigned' onClick={()=>setRecent(!recent)} className={recent ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Recently assigned</h3>
            {recent && allTasks && allTasks.map(task=>(
                <div className='my-Tasks-Assigned' key={task.id}>
                    <div className='my-Detail-Name'>{task.taskName}</div>
                    <div className='my-Detail-Deadline'>{task.deadline}</div>
                    <div className='my-Detail-Project'>{task.priority}</div>
                </div>
            ))}
            <h3><i id='today-Assigned' onClick={()=>setToday(!today)}  className={today ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Due today</h3>
            <h3><i id='this-week-Assigned' onClick={()=>setWeek(!week)}  className={week ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Due this week</h3>
        </div>
    )
}

export default AllTasks;
