import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
// import { GetProjectDetail } from '../../store/projects';
import { GetAllProjects } from '../../store/projects';
import { updateTask } from '../../store/tasks';
import EditTasks from '../tasks/EditTask';
import { GetAllTasks } from '../../store/tasks';
import { getSectionsThunk } from '../../store/section';
import { DeleteTask } from '../../store/tasks';
// import { DeleteProjects } from '../../store/projects';
import AddTaskModal from '../tasks/TaskModal';
import AddSectionModal from '../sections/AddSectionModal';
import EditSectionModal from '../sections/EditSectionModal';
import EditTaskModal from '../tasks/EditTaskModal';
import EditProjectModal from './EditProjectModal';
import DeleteProjectModal from './DeleteProject';
import './ProjectDetail.css'

function Project(){
    const dispatch = useDispatch();
    const {projectId} = useParams()
    const project = useSelector(state=>state.projects[projectId])
    const pDeadline = project?.deadline.split('-')
    const pStartdate = project?.startdate.split('-')
    const alltasks = useSelector(state=>state.tasks)
    const user = useSelector(state=>state.session.user)
    const today = new Date()
    const tasks = Object.values(alltasks).filter(task=> task.userId === user.id)
    const projectTask = tasks.filter(task => task.projectId === Number(projectId))
    const todoList = projectTask.filter(task=>task.status ==='incomplete')
    const doneList = projectTask.filter(task=>task.status === 'complete')
    // console.log(projectTask, todoList, doneList)
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);
    const [toList, setToList] = useState(true);
    const [done, setDoneList] = useState(true)
    const [editId, setEditId] = useState(0)
    const [menuId, setMenuId] = useState(0)
    const [sectionId, setSectionId] = useState(0)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // let editId = 0

    useEffect(()=>{
        // dispatch(GetProjectDetail(projectId))
        dispatch(GetAllProjects())
        dispatch(GetAllTasks())
        dispatch(getSectionsThunk(projectId))
    }, [dispatch])

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
        setShowEdit(true)
        // setEdit(true);
    }
    async function onDelete(e){
        e.preventDefault();
        await dispatch(DeleteTask(e.target.id))
    }
    // async function onDeleteProject(e){
    //     e.preventDefault();
    //     await dispatch(DeleteProjects(project.id))
    // }
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
                                <i onClick={()=>setShowDelete(true)} className="fa-regular fa-trash-can">  Delete</i>

                        </div>
                    </div>
                    <div className='project-Deadline'>{`${months[new Date(`${pStartdate[1]}, ${pStartdate[2]}, ${pStartdate[0]}`).getMonth()]} ${pStartdate[2]} - ${months[new Date(`${pDeadline[1]}, ${pDeadline[2]}, ${pDeadline[0]}`).getMonth()]} ${pDeadline[2]}`}</div>
                    <div className='project-Description'>Description: {project.description}</div>
                </div>

            )
        }
        {showModal && (<EditProjectModal onClose={()=>setShowModal(false)}/>)}
        {showDelete && (<DeleteProjectModal id={projectId} onClose={()=>setShowDelete(false)} />)}
        <AddTaskModal />

        <h2><i id='todo-List-Bar' onClick={()=>setToList(!toList)} className={toList ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Todo Lists</h2>
        <div className='todo-Bar'>
            <div className='task-Name'>Task name</div>
            <div className='task-Assignee'>Assignee</div>
            <div className='task-Deadline'>Due date</div>
            <div className='task-Status'>Status</div>
            <div className='edit-Bar'></div>
        </div>
        {
            toList && todoList && todoList.map(task=>{
                let deadline = task.deadline.split('-');
                let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)

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
                        {Number(task.id)===Number(editId) && showEdit && <EditTaskModal onEdit={()=>setEditId(0)} onClose={()=>setShowEdit(false)} id={task.id}/>}
                </div>

                // if(Number(task.id)===Number(editId) && showEdit){
                //     return (<EditTaskModal onEdit={()=>setEditId(0)} onClose={()=>setShowEdit(false)} id={task.id}/>)
                // }

            )})

        }
        <h2><i id='done-Lists-Bar' onClick={()=>setDoneList(!done)} className={done ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Done Lists</h2>
        <div className='done-List-Bar'>
            <div className='task-Name'>Task name</div>
            <div className='task-Assignee'>Assignee</div>
            <div className='task-Deadline'>Due date</div>
            <div className='task-Status'>Status</div>
            <div className='edit-Bar'></div>
        </div>
        {

            done && doneList&&(doneList.map(task=>{
                let deadline = task.deadline.split('-');
                let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
                console.log(date.getMonth())
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
                        {Number(task.id)===Number(editId)&& showEdit && <EditTaskModal onEdit={()=>setEditId(0)} onClose={()=>setShowEdit(false)} id={task.id}/>}
                    </div>
                )
            }
            ))
            }
            <div className='add-section-button' onClick={()=>setShowSection(true)}>+  Add section</div>
            {showSection && <AddSectionModal onClose={()=>setShowSection(false)} projectId={projectId} />}
            {showEditSection && <EditSectionModal onClose={()=>setShowEditSection(false)} projectId={projectId} id={sectionId} />}
        </div>
    )
}

export default Project;
