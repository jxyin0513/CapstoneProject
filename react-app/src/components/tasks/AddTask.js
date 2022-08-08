import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams} from 'react-router-dom'
import { CreateTask } from '../../store/tasks';
import './AddTask.css';

function AddTask(){
    const dispatch = useDispatch()
    const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const [assignee, setAssignee] = useState('')
    const [taskName, setTaskName] = useState('')
    const [deadline, setDeadline] = useState('')
    const [priority, setPriority] = useState('')
    const [errors, setErrors] = useState([])

    async function onSubmit(e){

        e.preventDefault()
        const task = {
            userId: user.id,
            projectId,
            assignee,
            taskName,
            status: 'incomplete',
            deadline,
            priority
        }
        const newTask = await dispatch(CreateTask(task))
        if(!newTask){
            history.push(`/projects/${projectId}`)
        }else{
            setErrors(newTask)
        }
    }

    return (
        <>
            <form className='Add-Task' onSubmit={onSubmit}>
                <div className='errors-handler'>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <label>Assignee:
                    <input type='text' name='assignee' onChange={e=>setAssignee(e.target.value)}></input>
                </label>
                <label>Name:
                    <input type='text' name='taskName' onChange={e=>setTaskName(e.target.value)}></input>
                </label>
                <label>Deadline:
                    <input type='date' name='deadline' onChange={e=>setDeadline(e.target.value)}></input>
                </label>
                <label>Priority:
                <input type='text' name='priority' onChange={e=>setPriority(e.target.value)}></input>
                </label>
                <button type='submit'>Add Task</button>
            </form>
        </>
    )
}

export default AddTask;
