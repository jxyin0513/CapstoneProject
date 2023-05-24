import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { GetEachTasks } from '../../store/tasks';
import { GetAllProjects } from '../../store/projects';
import { EditTask } from '../../store/tasks';
import './AllTasks.css'

function AllTasks(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const alltasks = useSelector(state=>state.tasks)
    const tasks = Object.values(alltasks)
    const allTasks = tasks.filter(task=>{
        if(task.userId === user.id && task.status==='incomplete'){
            return true
        }else{
            return false
        }
    })

    const date = new Date()
    const recentlyAssigned = allTasks.filter(task=>{
        const startdate = task.startdate.split('-')
        const tdate = new Date(`${startdate[1]}, ${startdate[2]}, ${startdate[0]}`)
        if((new Date(`${date.getMonth()+1}, ${date.getDate()}, ${date.getFullYear()}`) - tdate)/(3600*1000*24) < 3){
            return true;
        }else{
            return false;
        }
    })

    const todayTasks = allTasks.filter(task=>{
        const deadline = task.deadline.split('-')
        const tdate = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
        if(tdate.getMonth() === date.getMonth() && tdate.getDate() === date.getDate() && tdate.getFullYear() === date.getFullYear()){
            return true;
        }else{
            return false;
        }
    })

    const weekTasks = allTasks.filter(task=>{
        const deadline = task.deadline.split('-')
        const ddate = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
        if(new Date(`${date.getMonth()+1}, ${date.getDate()}, ${date.getFullYear()}`) < ddate && (date-ddate)+((3600*1000*24)*(6-date.getDay()))>0){
            return true
        }else{
            return false
        }
    })
    const [recent, setRecent] = useState(true)
    const [today, setToday] = useState(true)
    const [week, setWeek] = useState(true)


    useEffect(()=>{
        dispatch(GetEachTasks(user.id))
        dispatch(GetAllProjects())
    }, [dispatch, user.id])

    async function changeTask(e){
        e.preventDefault();
        let task = alltasks[e.target.id]
        task['status'] = 'complete'
        await dispatch(EditTask(task))
    }

    return (
        <div className='all-Tasks'>
            <div className='all-Tasks-Header'>
                <h2 className='tasks-header'>My Tasks</h2>
            </div>
            <div className='col-Bar'>
                <div className='my-Task-Names'>Task name</div>
                <div className='my-Deadline'>Due date</div>
                <div className='my-Projects'>Projects</div>
            </div>
            <h3><i id='recently-Assigned' onClick={()=>setRecent(!recent)} className={recent ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Recently assigned</h3>
            {recent && recentlyAssigned && recentlyAssigned.map(task=>(
                <div className='my-Tasks-Assigned' key={task.id}>
                    <div className='my-Detail-Outer'>
                        <i className="fa-regular fa-circle-check" id={task.id} onClick={changeTask}></i>
                        <div className='my-Detail-Name'>{task.taskName}</div>
                    </div>
                    <div className='my-Detail-Deadline'>{task.deadline}</div>
                    <div className='my-Detail-Project'>{task.project.name}</div>
                </div>
            ))}
            <h3><i id='today-Assigned' onClick={()=>setToday(!today)}  className={today ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Due today</h3>
            {today && todayTasks && todayTasks.map(task=>(
                <div className='my-Tasks-Assigned' key={task.id}>
                    <div className='my-Detail-Outer'>
                        <i className="fa-regular fa-circle-check" id={task.id} onClick={changeTask}></i>
                        <div className='my-Detail-Name'>{task.taskName}</div>
                    </div>
                    <div className='my-Detail-Deadline'>{task.deadline}</div>
                    <div className='my-Detail-Project'>{task.project.name}</div>
                </div>
            ))}
            <h3><i id='this-week-Assigned' onClick={()=>setWeek(!week)}  className={week ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Due this week</h3>
            {week && weekTasks && weekTasks.map(task=>(
                <div className='my-Tasks-Assigned' key={task.id}>
                    <div className='my-Detail-Outer'>
                        <i className="fa-regular fa-circle-check" id={task.id} onClick={changeTask}></i>
                        <div className='my-Detail-Name'>{task.taskName}</div>
                    </div>
                    <div className='my-Detail-Deadline'>{task.deadline}</div>
                    <div className='my-Detail-Project'>{task.project.name}</div>
                </div>
            ))}
        </div>
    )
}

export default AllTasks;
