import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
// import { GetProjectDetail } from '../../store/projects';
import { GetAllProjects } from '../../store/projects';
import { updateTask } from '../../store/tasks';
// import EditTasks from '../tasks/EditTask';
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
import DeleteSectionModal from '../sections/DeleteSectionModal';
import './ProjectDetail.css'

function Project(){
    const dispatch = useDispatch();
    const {projectId} = useParams()
    const project = useSelector(state=>state.projects[projectId])
    const sections = Object.values(useSelector(state=>state.sections))
    const pDeadline = project?.deadline.split('-')
    const pStartdate = project?.startdate.split('-')
    const alltasks = useSelector(state=>state.tasks)
    const user = useSelector(state=>state.session.user)
    const tasks = Object.values(alltasks).filter(task=> task.userId === user.id)
    // const projectTask = tasks.filter(task => task.projectId === Number(projectId))
    // const todoList = projectTask.filter(task=>task.status ==='incomplete')
    // const doneList = projectTask.filter(task=>task.status === 'complete')
    const [showModal, setShowModal] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const [showDeleteSection, setShowDeleteSection] = useState(false)
    const [showSection, setShowSection] = useState(false);
    const [showEditSection, setShowEditSection] = useState(false);
    const [changeSection, setChangeSection] = useState(false)
    const [showTaskId, setShowTaskId] = useState(0);
    // const [toList, setToList] = useState(true);
    const [taskId, setTaskId] = useState(0)
    const [editId, setEditId] = useState(0)
    const [menuId, setMenuId] = useState(0)
    const [deleteSectionId, setDeleteSectionId] = useState(0)
    const [sectionId, setSectionId] = useState(0)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    // let editId = 0

    useEffect(()=>{
        // dispatch(GetProjectDetail(projectId))
        dispatch(GetAllProjects())
        dispatch(GetAllTasks())
        dispatch(getSectionsThunk(projectId))
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

    useEffect(() => {
        if (!changeSection) return;

        const closeMenu = () => {
          setChangeSection(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [changeSection]);
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
    async function onSection(e){
        const task = e.target.id.split('-');
        // console.log(task)
        await dispatch(updateTask({
            id: task[1],
            sectionId: task[0]
        }))
    }
    // async function onDeleteProject(e){
    //     e.preventDefault();
    //     await dispatch(DeleteProjects(project.id))
    // }
    function editSection(e){
        setSectionId(e.target.id)
        setShowEditSection(true)
    }

    async function changeStatus(e){

        const task = e.target.id.split('-')
        await dispatch(updateTask({
            id: task[0],
            priority: task[1]
        }))
    }
    function showTask(e){
        // console.log(e.target.id)
        //
        if(showTaskId === e.target.id){
            setShowTaskId(0)
            console.log(showTaskId)
        }else{
            setShowTaskId(e.target.id)
            console.log(showTaskId)
        }
    }

    function moveSection(e){
        setChangeSection(true)
        setTaskId(e.target.id)
    }
    function deleteSection(e){
        setShowDeleteSection(true)
        setDeleteSectionId(e.target.id)
    }
    return (
        <div className='project-Detail'>
        {
            project && (
                <div className='project-profile'>
                    <div className='project-Name'>{project.name}</div>
                    <div className='edit-delete-Project'>
                        <i className="fa-solid fa-chevron-down"></i>
                        <div className='edit-Icon'>
                            <div onClick={()=>setShowModal(true)} className='edit-Project'>
                                <i className="far fa-edit" onClick={()=>setShowModal(true)}></i>
                                <div onClick={()=>setShowModal(true)}>Edit</div>
                            </div>
                            <div className='delete-Project' onClick={()=>setShowDelete(true)}>
                                <i onClick={()=>setShowDelete(true)} className="fa-regular fa-trash-can"></i>
                                <div onClick={()=>setShowDelete(true)}>Delete</div>
                            </div>
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
        {sections && sections.map(section=>{
            return (
                <div key={section.id}>
                    <div className='section-Bar'>
                        <h2>
                            <i id={section.id} onClick={showTask} className={Number(showTaskId)!==section.id ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> {section.name}
                        </h2>
                        <i onClick={editSection} id={section.id} className="fa-regular fa-pen-to-square"></i>
                        <i onClick={deleteSection} id={section.id} className="fa-solid fa-trash"></i>
                    </div>
                    {section.id !== Number(showTaskId) &&(

                    <div>

                    <div className='section-header'>
                        <div className='task-Name'>Task name</div>
                        <div className='task-Assignee'>Assignee</div>
                        <div className='task-Deadline'>Due date</div>
                        <div className='task-Status'>Priority</div>
                        <div className='edit-Bar'></div>
                    </div>
                    {tasks && tasks.map(task=>{

                        let deadline = task.deadline.split('-');
                        let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)
                        // console.log('-----')
                        // console.log(task.sectionId, section.id)
                        if(task.projectId===Number(projectId) && task.sectionId === section.id){
                            return(
                                <div className='task-List' key={task.id}>
                                    <div className='task-name-outer'>
                                        <p className='task-Name'>{task.taskName}</p>
                                        <div className='section-selector'>
                                            <i className="fa-solid fa-arrow-down" id={task.id} onClick={moveSection}></i>
                                            {/* <div className='section-tag'>move to other sections</div> */}

                                            <div className='section-dropdown'>
                                                {sections.map(section=>(
                                                    <div id={`${section.id}-${task.id}`} key={section.id} onClick={onSection} className='section-name'>{section.name}</div>
                                                ))}
                                            </div>

                                        </div>

                                    </div>
                                    <p className='task-Assignee'>{task.assignee}</p>
                                    <p className='task-Deadline'>{`${months[date.getMonth()]}  ${date.getDate()}`}</p>
                                    <div className='dropdown'>
                                        <p className={`${task.priority}-priority`}>{task.priority}</p>
                                        <i className="fa-solid fa-angle-down" id='priority-setting'></i>
                                        <div className='dropdown-Content'>
                                            <div onClick={changeStatus} id={`${task.id}-Low`} className='low-priority'>
                                                <div id={`${task.id}-Low`}>Low</div>
                                            </div>
                                            <div onClick={changeStatus} id={`${task.id}-Medium`} className='medium-priority'>
                                                <div id={`${task.id}-Medium`} >Medium</div>
                                            </div>
                                            <div onClick={changeStatus} id={`${task.id}-High`} className='high-priority'>
                                                <div id={`${task.id}-High`}>High</div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='edit-button'>
                                        <i className="fa-solid fa-bars" id={task.id} onClick={openMenu}></i>
                                        {showMenu && Number(menuId)===Number(task.id) && (
                                            <div key={task.id} className='edit-Menu'>
                                                <div className='edit-Task' id={task.id} onClick={onEdit}>
                                                    <i id={task.id} onClick={onEdit} className="far fa-edit"></i>
                                                    <div id={task.id} onClick={onEdit}>Edit</div>
                                                </div>
                                                <div onClick={onDelete} id={task.id} className='delete-Task'>
                                                    <i id={task.id} onClick={onDelete} className="fa-regular fa-trash-can"></i>
                                                    <div id={task.id} onClick={onDelete}>Delete</div>
                                                </div>
                                            </div>
                                            )}
                                    </div>
                                    {Number(task.id)===Number(editId) && showEdit && <EditTaskModal onEdit={()=>setEditId(0)} onClose={()=>setShowEdit(false)} id={task.id}/>}
                                </div>
                            )
                        }
                    })}
                    </div>
                    )}
                </div>
            )
        })}
        {/* {
            toList && todoList && todoList.map(task=>{
                let deadline = task.deadline.split('-');
                let date = new Date(`${deadline[1]}, ${deadline[2]}, ${deadline[0]}`)

                return (
                <div className='todo-List' key={task.id}>
                    <p className='task-Name'>
                        <div>{task.taskName}</div>
                        <i className="fa-solid fa-arrow-down" id='change-section' onClick={()=>setChangeSection(true)}></i>
                    </p>
                    <p className='task-Assignee'>{task.assignee}</p>
                    <p className='task-Deadline'>{`${months[date.getMonth()]}  ${date.getDate()}`}</p>
                    <div className='dropdown'>
                        <p className='task-Status'>{task.status}<i className="fa-solid fa-angle-down" id='priority-setting' onClick={()=>setChangePriority(true)}></i></p>
                        <div className='dropdown-Content'>
                            <div onClick={changeStatus} id={task.id} className='low-priority'>
                                <div>Low</div>
                            </div>
                            <div onClick={changeStatus} id={task.id} className='medium-priority'>
                                <div>Medium</div>
                            </div>
                            <div onClick={changeStatus} id={task.id} className='high-priority'>
                                <div>High</div>
                            </div>
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

        } */}
        {/* <h2><i id='done-Lists-Bar' onClick={()=>setDoneList(!done)} className={done ? "fa-solid fa-caret-down" : "fa-solid fa-caret-right"}></i> Done Lists</h2>
        <div className='done-List-Bar'>
            <div className='task-Name'>Task name</div>
            <div className='task-Assignee'>Assignee</div>
            <div className='task-Deadline'>Due date</div>
            <div className='task-Status'>Status</div>
            <div className='edit-Bar'></div>
        </div> */}
        {/* {

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
            } */}
            <div className='add-section-button' onClick={()=>setShowSection(true)}>+   Add section</div>
            {showSection && <AddSectionModal onClose={()=>setShowSection(false)} projectId={projectId} />}
            {showEditSection && <EditSectionModal onClose={()=>setShowEditSection(false)} projectId={projectId} id={sectionId} />}
            {showDeleteSection && <DeleteSectionModal onClose={()=>setShowDeleteSection(false)} id={deleteSectionId} />}
        </div>
    )
}

export default Project;
