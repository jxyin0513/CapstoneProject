import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory, useParams} from 'react-router-dom'
import { EditProjects } from '../../store/projects';

function EditProject(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const project = useSelector(state=>state.projects[projectId])
    console.log(project)
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description);
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        e.preventDefault();
        const project = {
            userId: user.id,
            name,
            description
        }
        const editProject = await dispatch(EditProjects(project))
        if(!editProject){
            history.push('/')
        }else{
            setErrors(editProject)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div className='errors-handler'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <label>Project Name:
                    <input type='text' name='name' value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>Description:
                    <input type='text' name='description' value={description} onChange={e=>setDescription(e.target.value)}></input>
                </label>
                <button type='submit'>Edit Project</button>
            </form>
        </>
    )
}

export default EditProject
