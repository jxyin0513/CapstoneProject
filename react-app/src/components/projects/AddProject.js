import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'
import { CreateProjects } from '../../store/projects';
import './AddProject.css';

function NewProject(){
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state=>state.session.user)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('');
    const [startdate, setStartdate] = useState(new Date());
    const [deadline, setDeadline] = useState('')
    const [errors, setErrors] = useState([])
    async function onSubmit(e){
        // setStartdate(new Date())
        // console.log(startdate)
        e.preventDefault();
        const project = {
            userId: user.id,
            name,
            description,
            startdate: `${startdate.getFullYear()}-${startdate.getMonth()+1}-${startdate.getDate()}`,
            deadline
        }
        const newProject = await dispatch(CreateProjects(project))
        if(!newProject){
            history.push('/')
        }else{
            setErrors(newProject)
        }
    }

    return (
        <div className='add-Project-Container'>

            <form className='add-Project-Form' onSubmit={onSubmit}>
                <div className='new-Project-Header'>New Project</div>
                <div className='errors-handler-Project'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='name' placeholder='Project name' onChange={e=>setName(e.target.value)}></input>
                </label>
                <label>
                    <input type='date' name='deadline' placeholder='Deadline' onChange={e=>setDeadline(e.target.value)}></input>
                </label>
                <label>
                    <textarea name='description' placeholder='Description' rows='5' cols='25' onChange={e=>setDescription(e.target.value)}></textarea>
                </label>
                <button type='submit'>Add Project</button>
            </form>
        </div>
    )
}

export default NewProject;
