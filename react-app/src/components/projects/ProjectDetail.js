import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { GetProjectDetail } from '../../store/projects';
import { updateTask } from '../../store/tasks';
import EditTasks from '../tasks/EditTask';
import { GetAllTasks } from '../../store/tasks';
import { DeleteTask } from '../../store/tasks';
import { DeleteProjects } from '../../store/projects';
import AddTaskModal from '../tasks/TaskModal';
import EditProjectModal from './EditProjectModal';
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
    const [showModal, setShowModal] = useState(false);
    const [showMenu, setShowMenu] = useState(false)
    const [toList, setToList] = useState(true);
    const [done, setDoneList] = useState(true)
    const [editId, setEditId] = useState(0)
    const [menuId, setMenuId] = useState(0)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // let editId = 0

    useEffect(()=>{
        dispatch(GetProjectDetail(projectId))
        dispatch(GetAllTasks())
    }, [dispatch, projectId])

    function openMenu(e){
        if(showMenu) return;
        setMenuId(e.target.id)
        setShowMenu(true)
    }
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
          setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
    // useEffect(()=>{

    //     document.addEventListener('click',)

    //     return ()=> document.removeEventListener('click')
    // },[edit])
    function onEdit(e){
        setEditId(e.target.id)
        // setEdit(true);
    }
    async function onDelete(e){
        e.preventDefault();
        await dispatch(DeleteTask(e.target.id))
    }
    async function onDeleteProject(e){
        e.preventDefault();
        await dispatch(DeleteProjects(project.id))
    }
    async function changeStatus(e){
        console.log(e.target.className)

        await dispatch(updateTask({
            id: e.target.id,
            status: e.target.className
        }))
    }

    return (
        <div className='project-Detail'>
        {
            project && (
                <div className='project-profile'>
                    <p className='project-Name'>{project.name}</p>
                    <div className='edit-delete-Project'>
                        <i className="fa-solid fa-chevron-down"></i>
                        <div className='edit-Icon'>
                                <i className="far fa-edit" onClick={()=>setShowModal(true)}>  Edit</i>
                                <i onClick={onDeleteProject} className="fa-regular fa-trash-can">  Delete</i>

                        </div>
                    </div>
                </div>

            )
        }
        {showModal && (<EditProjectModal onClose={()=>setShowModal(false)}/>)}

        <AddTaskModal />

        <h2><i id='todo-List-Bar' onClick={()=>setToList(!toList)} className={toList ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Todo Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Due date</div>
        <div className='task-Status'>Status</div>
        {
            toList && todoList && todoList.map(task=>{
                let deadline = task.deadline.split('-');
                let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
                if(Number(editId)!==Number(task.id)){
                    return (
                    <div className='todo-List' key={task.id}>
                        <p className='task-Name'>{task.taskName}</p>
                        <p className='task-Assignee'>{task.assignee}</p>
                        <p className='task-Deadline'>{`${months[date.getMonth()]}  ${date.getDate()}`}</p>
                        <div className='dropdown'>
                            <p className='task-Status'>{task.status}</p>
                            <div className='dropdown-Content'>
                                <div onClick={changeStatus} id={task.id} className='incomplete'>incomplete</div>
                                <div onClick={changeStatus} id={task.id} className='complete'>complete</div>
                            </div>
                        </div>
                        <div className='edit-button'>
                            <i className="fa-solid fa-bars" id={task.id} onClick={openMenu}></i>
                            {showMenu && Number(menuId)===Number(task.id) && (
                                <div key={task.id} className='edit-Menu'>
                                    <i id={task.id} onClick={onEdit} className="far fa-edit">  Edit</i>
                                    <i id={task.id} onClick={onDelete} className="fa-regular fa-trash-can">   Delete</i>
                                </div>
                                )}
                        </div>
                    </div>
                    )
                }else if(Number(task.id)===Number(editId)){
                    return (<EditTasks id={task.id}/>)
                }
            }
            )

        }
        <h2><i id='done-Lists-Bar' onClick={()=>setDoneList(!done)} className={done ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Done Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Due date</div>
        <div className='task-Status'>Status</div>
        {

            done && doneList&&(doneList.map(task=>{
                let deadline = task.deadline.split('-');
                let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
                console.log(date.getMonth())
                if(Number(editId)!==Number(task.id)){
                    return (
                    <div className='done-List' key={task.id}>
                        <p className='task-Name'>{task.taskName}</p>
                        <p className='task-Assignee'>{task.assignee}</p>
                        <p className='task-Deadline'>{`${months[date.getMonth()]}  ${date.getDate()}`}</p>
                        <div className='dropdown'>
                            <p className='task-Status'>{task.status}</p>
                            <div className='dropdown-Content'>
                                <div onClick={changeStatus} id={task.id} className='incomplete'>incomplete</div>
                                <div onClick={changeStatus} id={task.id} className='complete'>complete</div>
                            </div>
                        </div>
                        <div className='edit-button'>
                            <i className="fa-solid fa-bars" id={task.id} onClick={openMenu}></i>
                            {showMenu && Number(menuId)===Number(task.id) && (
                                <div key={task.id} className='edit-Menu'>
                                    <i id={task.id} onClick={onEdit} className="far fa-edit">  Edit</i>
                                    <i id={task.id} onClick={onDelete} className="fa-regular fa-trash-can">   Delete</i>
                                </div>
                                )}
                        </div>
                    </div>
                    )
                }else if(Number(task.id)===Number(editId)){
                    return (<EditTasks id={task.id}/>)
                }

            }))
        }
        </div>
    )
}

export default Project;
