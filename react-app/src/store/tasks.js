const GET_TASKS = '/GET/ALL/TASKS';
const GET_TASK = '/GET/TASK/DETAIL'
const CREATE_TASK = '/POST/NEW/TASK';
const EDIT_TASK = '/PUT/TASK';
const DELETE_TASK = '/DELETE/TASK';

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

export const GetAllTasks = ()=> async(dispatch)=>{
    const response = await fetch('/api/tasks/all')

    if(response.ok){
        const data = await response.json();
        dispatch(getTask(data.tasks))
    }
}

export const GetTaskDetail = (id)=> async(dispatch)=>{
    const response = await fetch(`/api/tasks/${id}`)

    if(response.ok){
        const data = await response.json();
        dispatch(getTasks(data.task))
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
        console.log(data)
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

export const DeleteTask = (task) =>async (dispatch)=>{
    const response = await fetch(`/api/tasks/${task.id}/delete`,{
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

        default:
            return state;
    }
}

export default taskReducer;
