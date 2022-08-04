import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import { EditTask } from '../../store/tasks';

function EditTasks({id}){
    const dispatch = useDispatch()
    const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const task = useSelector(state=>state.tasks.id)

    const [assignee, setAssignee] = useState(task.assignee)
    const [taskName, setTaskName] = useState(task.taskName)
    const [deadline, setDeadline] = useState(task.deadline)
    const [status, setStatus] = useState(task.status)
    const [priority, setPriority] = useState(task.priority)
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        e.preventDefault()
        const task = {
            userId: user.id,
            projectId: projectId,
            assignee,
            taskName,
            status: 'incomplete',
            deadline,
            priority
        }
        const editTask = dispatch(EditTask(task))
        if(!editTask){
            history.push(`/projects/${projectId}`)
        }else{
            setErrors(editTask)
        }
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                    ))}
                </div>
                <label>Assignee:
                    <input type='text' name='assignee' value={assignee} onChange={e=>setAssignee(e.target.value)}></input>
                </label>
                <label>Name:
                    <input type='text' name='taskName' value={taskName} onChange={e=>setTaskName(e.target.value)}></input>
                </label>
                <label>Deadline:
                    <input type='date' name='deadline' value={deadline} onChange={e=>setDeadline(e.target.value)}></input>
                </label>
                <label>Status:
                    <select name='status' value={status} onChange={e=>setStatus(e.target.value)}>
                        <option value='incomplete'>Incomplete</option>
                        <option value='complete'>Complete</option>
                    </select>
                </label>
                <label>Priority:
                <input type='text' name='priority' value={priority} onChange={e=>setPriority(e.target.value)}></input>
                </label>
                <button type='submit'></button>
            </form>
        </>
    )
}

export default EditTasks
