import React, {useEffect, useState } from 'react';
import {useHistory } from 'react-router-dom';
import { GetAllProjects } from '../store/projects';
import { GetAllTasks } from '../store/tasks';
import { useSelector, useDispatch } from 'react-redux';
import './DefaultPage.css'

function MainPageStatus(){
    const dispatch = useDispatch()
    const user = useSelector(state=>state.session.user)
    const history = useHistory()
    // let allProjects, allTasks;
    const projects = Object.values(useSelector(state=>state.projects)).filter(project=>project.userId===user.id)
    const tasks = Object.values(useSelector(state=>state.tasks)).filter(task => task.userId === user.id)
    const completed = tasks.filter(task=>task.status === 'complete')
    const [date, setDate] = useState(new Date())
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    console.log(new Date('08, 10, 2022'), tasks)
    let message;
    if(date.getHours()>12 && date.getHours()<19){
        message='Good afternoon'
    }else if(date.getHours()<12){
        message='Good morning'
    }else{
        message='Good night'
    }
    function onProject(e){
        history.push(`/projects/${e.target.id}`)
        console.log(e.target.id)
    }
    function addProject(e){
        history.push('/new/project-form')
    }
    useEffect(()=>{
        dispatch(GetAllProjects())
        dispatch(GetAllTasks())
    },[dispatch])

    return (
        <div className='default-Page'>
            <h2>Home</h2>
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

                </div>
            </div>
        </div>
    )
}

export default MainPageStatus
