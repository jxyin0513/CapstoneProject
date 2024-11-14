import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom'
import { EditProjects } from '../../store/projects';
import './EditProject.css'

function EditProject({onClose}){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const project = useSelector(state=>state.projects[projectId])
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description);
    const [startdate, setStartDate] = useState(project.startdate)
    const [deadline, setDeadline] = useState(project.deadline)
    const [errors, setErrors] = useState([])

    async function onSubmit(e){

        e.preventDefault();
        const project = {
            id: projectId,
            userId: user.id,
            name,
            startdate,
            deadline,
            description
        }
        const editProject = await dispatch(EditProjects(project))
        if(!editProject){
            onClose()
            navigate.push(`/projects/${projectId}`)
        }else{
            setErrors(editProject)
        }
    }
    function onclosePage(e){
        onClose()
    }

    return (
        <div className='edit-project-container'>
            <div className='detail-Header'>
                <div className='detail-Text'>Project Detail</div>
                <i id='close-Icon' onClick={onclosePage} className="fa-solid fa-xmark"></i>
            </div>
            <form className='edit-Project-Form' onSubmit={onSubmit}>
                <div className='errors-edit-Project'>
                    {errors.map((error, ind) => (
                    <div key={ind}>*{error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='name' value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label className='startdate-Outer'>
                    <input type='date' name='startdate' value={startdate} onChange={e=>setStartDate(e.target.value)} ></input>
                    <div>(Start date)</div>
                </label>
                <label className='duedate-Outer'>
                    <input type='date' name='deadline' value={deadline} onChange={e=>setDeadline(e.target.value)} ></input>
                    <div>(Due date)</div>
                </label>
                <label>
                    <textarea name='description' placeholder='Description' value={description} rows='5' cols='30' onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <button type='submit'>Edit Project</button>
            </form>
        </div>
    )
}

export default EditProject
