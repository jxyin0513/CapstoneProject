import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams} from 'react-router-dom'
import { CreateTask } from '../../store/tasks';
import './AddTask.css';

function AddTask({onClose}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const [assignee, setAssignee] = useState('')
    const [taskName, setTaskName] = useState('')
    const [startdate, setStartdate] = useState(new Date());
    const [deadline, setDeadline] = useState('')
    // const [priority, setPriority] = useState('')
    const [errors, setErrors] = useState([])

    async function onSubmit(e){

        e.preventDefault()
        const task = {
            userId: user.id,
            projectId,
            assignee,
            taskName,
            status: 'incomplete',
            startdate:`${startdate.getFullYear()}-${startdate.getMonth()+1}-${startdate.getDate()}`,
            deadline,
        }
        const newTask = await dispatch(CreateTask(task))
        if(!newTask){
            onClose()
            // history.push(`/projects/${projectId}`)
        }else{
            setErrors(newTask)
        }
    }

    return (
        <div className='add-Tasks'>
            <div className='add-new-Task'>Add Task</div>
            <form className='add-Task-Form' onSubmit={onSubmit}>
                <div className='errors-handler'>
                    {errors.map((error, ind) => (
                    <div key={ind}>* {error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='assignee' placeholder='Assignee' onChange={e=>setAssignee(e.target.value)}></input>
                </label>
                <label>
                    <input type='text' name='taskName' placeholder='Task name' onChange={e=>setTaskName(e.target.value)}></input>
                </label>
                <label>
                    <input type='date' name='deadline' placeholder='Due date' onChange={e=>setDeadline(e.target.value)}></input>
                </label>
                {/* <label>
                <input type='text' name='priority' placeholder='Priority' onChange={e=>setPriority(e.target.value)}></input>
                </label> */}
                <button onClick={onClose}>Cancel</button>
                <button type='submit'>Add Task</button>

            </form>
        </div>
    )
}

export default AddTask;
