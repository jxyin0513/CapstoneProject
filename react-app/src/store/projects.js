const GET_PROJECTS = '/GET/ALL/PROJECTS';
const GET_PROJECT_DETAIL = '/GET/PROJECT/DETAIL'
const CREATE_PROJECT = '/POST/PROJECT';
const EDIT_PROJECT = '/PUT/PROJECT';
const DELETE_PROJECT = '/DELETE/PROJECT';

const getProjects = (projects)=>({
    type: GET_PROJECTS,
    projects
})

const getProjectDetail = (project)=>({
    type: GET_PROJECT_DETAIL,
    project
})

const createProject = (project)=>({
    type: CREATE_PROJECT,
    project
})

const editProject = (project)=>({
    type: EDIT_PROJECT,
    project
})

const deleteProject = (project)=>({
    type: DELETE_PROJECT,
    project
})

export const GetAllProjects =() => async (dispatch)=>{
    const response = await fetch('/api/projects/all')
    if(response.ok){
        const data = await response.json()
        dispatch(getProjects(data.projects))
    }
}

export const GetProjectDetail = (id) => async (dispatch)=>{
    const response = await fetch(`/api/projects/${id}`)
    if(response.ok){
        const data = await response.json()
        dispatch(getProjectDetail(data.project))
    }
}

export const CreateProjects = (project) => async (dispatch)=>{
    const response = await fetch('/api/projects/new',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(createProject(data.project))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const EditProjects = (project) => async (dispatch)=>{
    const response = await fetch(`/api/projects/${project.id}/edit`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(project)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editProject(data.project))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const DeleteProjects = (id) => async (dispatch)=>{
    const response = await fetch(`/api/projects/${id}/delete`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteProject(data.project))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

const initialState = {}

const projectReducer = (state=initialState, action)=>{
    let newState = {...state};
    switch(action.type){
        case GET_PROJECTS:
            action.projects.forEach(project => {
                newState[project.id] = project
            });
            return newState;

        case GET_PROJECT_DETAIL:
            newState={};
            newState[action.project.id] = action.project;
            return newState;

        case CREATE_PROJECT:
            newState[action.project.id] = action.project
            return newState;

        case EDIT_PROJECT:
            newState[action.project.id] = action.project;
            return newState;

        case DELETE_PROJECT:
            delete newState[action.project.id];
            return newState;

        default:
            return state
    }
}

export default projectReducer;
