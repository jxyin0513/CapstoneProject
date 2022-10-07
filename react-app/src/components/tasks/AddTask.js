import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams} from 'react-router-dom'
import { CreateTask } from '../../store/tasks';
import './AddTask.css';

function AddTask({onClose}){
    const dispatch = useDispatch()
    // const history = useHistory()
    const {projectId} = useParams()
    const user = useSelector(state=>state.session.user)
    const sections = Object.values(useSelector(state=>state.sections))
    const [assignee, setAssignee] = useState('')
    const [taskName, setTaskName] = useState('')
    const [priority, setPriority] = useState('')
    const [sectionId, setSectionId] = useState('')
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
            sectionId,
            priority,
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
                <div className='errors-handler-task'>
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
                    <select name='section' placeholder='section' onChange={e=>setSectionId(e.target.value)}>
                        {sections && sections.map(section=>(
                            <option value={section.id}>{section.name}</option>
                        ))}

                    </select>
                </label>
                <label>
                    <select name='priority' placeholder='priority' onChange={e=>setPriority(e.target.value)}>
                        <option value={''}>Please choose task priority</option>
                        <option value={"Low"}>Low</option>
                        <option value={"Medium"}>Medium</option>
                        <option value={"High"}>High</option>


                    </select>
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
