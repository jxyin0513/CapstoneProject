import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { GetProjectDetail } from '../../store/projects';
// import { EditTask } from '../../store/tasks';
import EditTasks from '../tasks/EditTask';
import { GetAllTasks } from '../../store/tasks';
import { DeleteTask } from '../../store/tasks';
import './ProjectDetail.css'

function Project(){
    const dispatch = useDispatch();
    const {projectId} = useParams()
    const project = useSelector(state=>state.projects[projectId])
    const alltasks = useSelector(state=>state.tasks)
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(alltasks).filter(task=> task.userId === user.id)
    const projectTask = tasks.filter(task => task.projectId === Number(projectId))
    const todoList = projectTask.filter(task=>task.status ==='incomplete')
    const doneList = projectTask.filter(task=>task.status === 'complete')
    // const [assignee, setAssignee] = useState(task.assignee)
    // const [taskName, setTaskName] = useState(task.taskName)
    // const [deadline, setDeadline] = useState(task.deadline)
    // const [status, setStatus] = useState(task.status)
    // const [priority, setPriority] = useState(task.priority)
    // const [errors, setErrors] = useState([])
    const [edit,setEdit] = useState(false)


    useEffect(()=>{
        dispatch(GetProjectDetail(projectId))
        dispatch(GetAllTasks())
    }, [dispatch, projectId])

    // useEffect(()=>{

    //     document.addEventListener('click',)

    //     return ()=> document.removeEventListener('click')
    // },[edit])
    function onDelete(e){
        e.preventDefault();
        dispatch(DeleteTask(e.target.id))
    }

    return (
        <div className='project-Detail'>
        {
            project && (
                <div>
                    <p>{project.name}</p>
                </div>

            )
        }
        <h2>Todo Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Deadline</div>
        <div className='task-Status'>Status</div>
        {
            todoList && todoList.map(task=>{
                if(!edit){
                    return (
                    <div className='todo-List'>
                        <p className='task-Name'>{task.taskName}</p>
                        <p className='task-Assignee'>{task.assignee}</p>
                        <p className='task-Deadline'>{task.deadline}</p>
                        <p className='task-Status'>{task.status}</p>
                        <button onClick={e=>setEdit(true)}>Edit</button>
                        <button id={task.id} onClick={onDelete}>Delete</button>
                    </div>
                    )
                }else if(edit){
                    return (<EditTasks id={task.id}/>)
                }
            }
            )

        }
        <h2>Done Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Deadline</div>
        <div className='task-Status'>Status</div>
        {

            doneList && doneList.map(list=>{
                <div className='Done-list' key={list.id}>
                    <li>{list.assignee}</li>
                    <li>{list.taskName}</li>
                    <li>{list.status}</li>
                    <li>{list.deadline}</li>
                </div>
            })
        }
        </div>
    )
}

export default Project;
