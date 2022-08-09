import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { GetProjectDetail } from '../../store/projects';
// import { EditTask } from '../../store/tasks';
import EditTasks from '../tasks/EditTask';
import { GetAllTasks } from '../../store/tasks';
import { DeleteTask } from '../../store/tasks';
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
    const [editId, setEditId] = useState(0)
    const [menuId, setMenuId] = useState(0)
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
    function onDelete(e){
        e.preventDefault();
        dispatch(DeleteTask(e.target.id))
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
                                <i className="far fa-edit" onClick={()=>setShowModal(true)}>Edit</i>
                                <i className="fa-regular fa-trash-can">Delete</i>

                        </div>
                    </div>
                </div>

            )
        }
        {showModal && (<EditProjectModal onClose={()=>setShowModal(false)}/>)}

        <AddTaskModal />

        <h2>Todo Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Due date</div>
        <div className='task-Status'>Status</div>
        {
            todoList.length && todoList.map(task=>{
                if(Number(editId)!==Number(task.id)){
                    return (
                    <div className='todo-List' key={task.id}>
                        <p className='task-Name'>{task.taskName}</p>
                        <p className='task-Assignee'>{task.assignee}</p>
                        <p className='task-Deadline'>{task.deadline}</p>
                        <div className='dropdown'>
                            <p className='task-Status'>{task.status}</p>
                            <div className='dropdown-Content'>
                                <p>incomplete</p>
                                <p>complete</p>
                            </div>
                        </div>
                        <div className='edit-button'>
                            <i className="fa-solid fa-bars" id={task.id} onClick={openMenu}></i>
                            {showMenu && Number(menuId)===Number(task.id) && (
                                <div key={task.id} className='edit-Menu'>
                                    <i id={task.id} onClick={onEdit} className="far fa-edit">Edit</i>
                                    <i id={task.id} onClick={onDelete} className="fa-regular fa-trash-can">Delete</i>
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
        <h2>Done Lists</h2>
        <div className='task-Name'>Task name</div>
        <div className='task-Assignee'>Assignee</div>
        <div className='task-Deadline'>Due date</div>
        <div className='task-Status'>Status</div>
        {

            doneList&&(doneList.map(list=>(
                <div className='Done-list' key={list.id}>
                    <li>{list.assignee}</li>
                    <li>{list.taskName}</li>
                    <li>{list.status}</li>
                    <li>{list.deadline}</li>
                </div>
            )))
        }
        </div>
    )
}

export default Project;
