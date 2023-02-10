import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams} from 'react-router-dom'
import { EditTask } from '../../store/tasks';
import './EditTask.css'

function EditTasks({onEdit, id, onClose}){
    const dispatch = useDispatch()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const task = useSelector(state=>state.tasks[id])
    const startdate = task.startdate
    const [assignee, setAssignee] = useState(task.assignee)
    const [taskName, setTaskName] = useState(task.taskName)
    const [deadline, setDeadline] = useState(task.deadline)
    // const [status, setStatus] = useState(task.status)
    // const [priority, setPriority] = useState(task.priority)
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        console.log(deadline)
        e.preventDefault()
        const eTask = {
            id,
            userId: user.id,
            projectId: projectId,
            assignee,
            taskName,
            status: task.status,
            priority: task.priority,
            startdate,
            deadline,
        }
        const editTask = await dispatch(EditTask(eTask))
        if(!editTask){
            onClose()
            onEdit()
            // history.push(`/projects/${projectId}`)
        }else{
            setErrors(editTask)
        }
    }

    return (
        <div className='edit-Task-Outer'>
            <div className='edit-task-Header'>Edit task</div>
            <form className='edit-Task-Form' onSubmit={onSubmit}>
                <div className='errors-handler-edit-task'>
                    {errors.map((error, ind) => (
                    <div key={ind}>* {error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='taskName' value={taskName} onChange={e=>setTaskName(e.target.value)}></input>
                </label>
                <label>
                    <input type='text' name='assignee' value={assignee} onChange={e=>setAssignee(e.target.value)}></input>
                </label>
                <label>
                    <input type='date' name='deadline' value={deadline} onChange={e=>setDeadline(e.target.value)} ></input>
                </label>
                {/* <label>
                    <select name='status' value={status} onChange={e=>setStatus(e.target.value)}>
                        <option value='incomplete'>Incomplete</option>
                        <option value='complete'>Complete</option>
                    </select>
                </label> */}
                {/* <label>
                <input type='text' name='priority' value={priority} onChange={e=>setPriority(e.target.value)}></input>
                </label> */}
                {/* <button onClick={onClose}>Cancel</button> */}
                <button type='submit'>Edit Task</button>
            </form>
        </div>
    )
}

export default EditTasks
