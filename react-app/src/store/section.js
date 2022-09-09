const GET_SECTIONS = '/get/all/sections';
const CREATE_SECTION = '/post/section/new';
const EDIT_SECTION = '/edit/section';
const DELETE_SECTION = '/delete/section';

const getSections = (sections)=>({
    type: GET_SECTIONS,
    sections
})

const createSection = (section)=>({
    type: CREATE_SECTION,
    section
})

const editSection = (section)=>({
    type: EDIT_SECTION,
    section
})

const deleteSection = (section)=>({
    type: DELETE_SECTION,
    section
})

export const getSectionsThunk = (id)=> async (dispatch) =>{
    const response = await fetch(`/api/sections/${id}`)
    if(response.ok){
        const data = await response.json()
        dispatch(getSections(data.sections))
    }
}

export const createSectionThunk = (section)=> async(dispatch)=>{
    const response = await fetch(`/api/sections/new`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(section)
    })
    if(response.ok){
        const data = await response.json()
        console.log(data)
        dispatch(createSection(data.section))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const editSectionThunk = (section)=> async (dispatch)=>{
    const response = await fetch(`/api/sections/${section.id}/edit`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(section)
    })
    if(response.ok){
        const data = await response.json()
        dispatch(editSection(data.section))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

export const deleteSectionThunk = (section) => async(dispatch)=>{
    const response = await fetch(`/api/sections/${section.id}/delete`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
    })
    if(response.ok){
        const data = await response.json()
        dispatch(deleteSection(data.section))
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
        return data.errors;
        }
    }
}

const initialState = {}

const sectionReducer = (state=initialState, action)=>{
    let newState = {...state}
    switch(action.type){
        case GET_SECTIONS:
            action.sections.forEach(section=>{
                newState[section.id] = section.name
            })
            return newState;

        case CREATE_SECTION:
            newState[action.section.id] = action.section.name
            return newState;

        case EDIT_SECTION:
            newState[action.section.id] = action.section.name
            return newState;

        case DELETE_SECTION:
            delete newState[action.section.id]
            return newState;

        default:
            return state;
    }
}

export default sectionReducer;
