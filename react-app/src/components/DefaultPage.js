import React, {useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom';
import { GetAllProjects } from '../store/projects';
// import { GetAllTasks } from '../store/tasks';
import { GetEachTasks } from '../store/tasks';
import { useSelector, useDispatch } from 'react-redux';
import './DefaultPage.css'

function MainPageStatus(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const history = useHistory()
    // let allProjects, allTasks;
    const projects = Object.values(useSelector(state=>state.projects)).filter(project=>project.userId===user.id)
    const tasks = Object.values(useSelector(state=>state.tasks)).filter(task => task.userId === user.id)
    const [upcoming, setUpcoming] = useState(true);
    const [pastDue, setPastDue] = useState(false);
    const [date, setDate] = useState(new Date())
    const upcomingTasks = tasks.filter(task=>{
        const tdate = task.deadline.split('-');
        if(((new Date(`${tdate[1]}, ${tdate[2]}, ${tdate[0]}`)-new Date(`${date.getMonth()+1}, ${date.getDate()}, ${date.getFullYear()}`))/(3600 * 1000 * 24))<5 && ((new Date(`${tdate[1]}, ${tdate[2]}, ${tdate[0]}`)-new Date(`${date.getMonth()+1}, ${date.getDate()}, ${date.getFullYear()}`))/(3600 * 1000 * 24))>0){
            return true
        }else{
            return false
        }
    })
    const pastTasks = tasks.filter(task=>{
        const tdate = task.deadline.split('-');
        // console.log(tdate < new Date())
        if(((new Date(`${tdate[1]}, ${tdate[2]}, ${tdate[0]}`)-new Date(`${date.getMonth()+1}, ${date.getDate()}, ${date.getFullYear()}`))/(3600 * 1000 * 24)) <0 ){
            return true;
        }else{
            return false;
        }
    })
    const completed = tasks.filter(task=>task.status === 'complete')

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    // console.log(typeof((new Date('08, 30, 2022')-new Date('08, 14, 2022'))/(3600 *1000 * 24)), tasks, pastTasks, upcomingTasks)
    let message;

    if(date.getHours()>=12 && date.getHours()<19){
        message='Good afternoon'
    }else if(date.getHours()<12){
        message='Good morning'
    }else{
        message='Good night'
    }
    function onProject(e){
        history.push(`/projects/${e.target.id}`)
    }
    function addProject(e){
        history.push('/new/project-form')
    }
    function onUpcoming(e){
        setPastDue(false)
        setUpcoming(true)
    }

    function onPast(e){
        setUpcoming(false)
        setPastDue(true)
    }

    useEffect(()=>{
        dispatch(GetAllProjects())
        dispatch(GetEachTasks(user.id))
    },[dispatch, user.id])

    function pastTask(e){
        history.push(`/projects/${e.target.id}`)
    }
    function upcomingTask(e){
        history.push(`/projects/${e.target.id}`)
    }
    return (
        <div className='default-Page'>
            <h2 className='home-header'>Home</h2>
            <div className='date-Page'>{`${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`}</div>
            <div className='welcome-Page'>{`${message}, ${user.username}`}</div>
            <div className='weekly-Status'>
                <div className='weekly-Display'>
                    <i id='status-Icon' className="fa-solid fa-circle-check"></i>
                    {`${completed.length} tasks completed`}
                </div>
            </div>
            <div className='project-Tasks'>
                <div className='project-Home-Page'>
                    <div className='project-Home-Header'>Projects</div>
                    <div onClick={addProject} className='create-Project-Container'>
                        <div onClick={addProject} className='create-Project'>+</div>
                        <div onClick={addProject} className='create-Project-T'>Create Project</div>
                    </div>

                    {projects && (projects.map(project=>(
                        <div key={project.id} id={project.id} onClick={onProject} className='project-Specific'>
                            <div className='create-Project'>
                                <i id={project.id} onClick={onProject} className="fa-solid fa-list-ul"></i>
                            </div>
                            <div id={project.id} onClick={onProject} className='create-Project-Name'>{project.name}</div>
                        </div>
                    )))}
                </div>
                <div className='task-Home-Page'>
                    <div className='task-Home-Header'>Tasks</div>
                    <div className='task-Home-Bar'>
                        <div onClick={onUpcoming} className={upcoming ? 'upcoming-Tasks-Bar' : ''}>Upcoming</div>
                        <div onClick={onPast} className={pastDue ? 'overdue-Tasks-Bar' : ''}>Overdue</div>
                    </div>
                    <div className='task-header-Names'>
                        <div>Assignee</div>
                        <div>Task name</div>
                        <div>Due date</div>
                    </div>
                    {upcoming && upcomingTasks && upcomingTasks.map(task=>(
                        // <NavLink to={`/projects/${task.projectId}`}></NavLink>
                        <div key={task.id} id={task.projectId} className='upcoming-Tasks' onClick={upcomingTask}>
                            <div id={task.projectId}>{task.assignee}</div>
                            <div id={task.projectId}>{task.project.name}</div>
                            <div id={task.projectId}>{task.deadline}</div>
                        </div>

                    ))}
                    {pastDue && pastTasks && pastTasks.map(task=>(
                        <div key={task.id} id={task.projectId} className='past-Tasks' onClick={pastTask}>
                            <div id={task.projectId}>{task.assignee}</div>
                            <div id={task.projectId}>{task.project.name}</div>
                            <div id={task.projectId}>{task.deadline}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainPageStatus
