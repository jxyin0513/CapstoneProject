import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { CreateProjects } from '../../store/projects';

function NewProject(){
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState([])
    async function onSubmit(e){
        e.preventDefault();
        const project = {
            userId: user.id,
            name,
            description
        }
        const newProject = await dispatch(CreateProjects(project))
        if(!newProject){
            history.push('/')
        }else{
            setErrors(newProject)
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
                <label>Project Name
                    <input type='text' name='name' onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>Description
                    <input type='text' name='description' onChange={e=>setDescription(e.target.value)}></input>
                </label>
                <button type='submit'>Add Project</button>
            </form>
        </>
    )
}

export default NewProject;
