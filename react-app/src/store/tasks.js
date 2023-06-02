const GET_TASKS = '/GET/ALL/TASKS';
const GET_TASK = '/GET/TASK/DETAIL'
const CREATE_TASK = '/POST/NEW/TASK';
const EDIT_TASK = '/PUT/TASK';
const DELETE_TASK = '/DELETE/TASK';
const DELETE_RELATED_TASK = '/DELETE/RELATED/TASKS'

const getTasks = (tasks)=>({
    type: GET_TASKS,
    tasks
})

const getTask = (task)=>({
    type: GET_TASK,
    task
})

const createTask = (task)=>({
    type: CREATE_TASK,
    task
})

const editTask = (task)=>({
    type: EDIT_TASK,
    task
})

const deleteTask = (task)=>({
    type: DELETE_TASK,
    task
})

const deleteTasks = (tasks)=>({
    type: DELETE_RELATED_TASK,
    tasks
})

export const GetAllTasks = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/tasks/all/${id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getTasks(data.tasks))
    }
}
export const GetEachTasks = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/tasks/each/${id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getTasks(data.tasks))

    }
}

export const GetTaskDetail = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/tasks/${id}`)
    if(response.ok){
        const data = await response.json();
        dispatch(getTask(data.task))
    }
}

export const CreateTask = (task)=> async(dispatch)=>{
    const response = await fetch('/api/tasks/new',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(createTask(data.task))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const EditTask = (task) => async(dispatch)=>{
    const response = await fetch(`/api/tasks/${task.id}/edit`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(editTask(data.task))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const updateTask = (task) => async(dispatch)=>{
    const response = await fetch(`/api/tasks/${task.id}/update`,{
        method:'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(task)
    })
    if(response.ok){
        const data = await response.json();
        dispatch(editTask(data.task))
        return null;
    }
}

export const DeleteTask = (id) =>async (dispatch)=>{
    const response = await fetch(`/api/tasks/${id}/delete`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteTask(data.task))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}
export const DeleteRelatedTask = (id) =>async (dispatch)=>{
    const response = await fetch(`/api/tasks/${id}/delete/relate`,{
        method:'DELETE',
        headers: {'Content-Type': 'application/json'}
    })
    if(response.ok){
        const data = await response.json();
        dispatch(deleteTasks(data.tasks))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

const initialState = {}

const taskReducer = (state=initialState, action) =>{
    let newState = {...state}
    switch(action.type){
        case GET_TASKS:
            action.tasks.forEach(task=>{
                newState[task.id] = task
            })
            return newState;

        case GET_TASK:
            newState= {};
            newState[action.task.id] = action.task;
            return newState

        case CREATE_TASK:
            newState[action.task.id] = action.task
            return newState;

        case EDIT_TASK:
            newState[action.task.id] = action.task
            return newState;

        case DELETE_TASK:
            delete newState[action.task.id];
            return newState;

        // case DELETE_RELATED_TASK:
        //     action.tasks.forEach(task=>{
        //         delete newState[task.id]
        //     })
        //     return newState;

        default:
            return state;
    }
}

export default taskReducer;
