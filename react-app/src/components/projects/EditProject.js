import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom'
import { EditProjects } from '../../store/projects';
import './EditProject.css'

function EditProject({onClose}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const project = useSelector(state=>state.projects[projectId])
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description);
    const [startdate, setStartDate] = useState(project.startdate)
    const [deadline, setDeadline] = useState(project.deadline)
    const [errors, setErrors] = useState([])
    console.log(project)

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
            history.push(`/projects/${projectId}`)
        }else{
            setErrors(editProject)
        }
    }
    function onclosePage(e){
        // e.preventDefault();
        onClose()
    }

    return (
        <>
            <div className='detail-Header'>
                <div className='detail-Text'>Project Detail</div>
                <i id='close-Icon' onClick={onclosePage} className="fa-solid fa-xmark"></i>
            </div>
            <form className='edit-Project-Form' onSubmit={onSubmit}>
                <div className='errors-handler'>
                    {errors.map((error, ind) => (
                    <div key={ind}>*{error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='name' value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>
                    <input type='date' name='deadline' value={deadline} onChange={e=>setDeadline(e.target.value)} ></input>
                </label>
                <label>
                    <textarea name='description' placeholder='Description' value={description} rows='5' cols='25' onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <button type='submit'>Edit Project</button>
            </form>
        </>
    )
}

export default EditProject
