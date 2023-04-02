import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editSectionThunk } from '../../store/section';
import './editSection.css'

function EditSection({onClose, projectId, id}){
    const dispatch = useDispatch()
    const section = useSelector(state=>state.sections[id])
    const [name, setName] = useState(section.name)
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        e.preventDefault();
        const section = {
            id,
            projectId,
            name
        }

        const newSection = await dispatch(editSectionThunk(section))
        if(!newSection){
            onClose()
        }else{
            setErrors(newSection)
        }
    }

    return (
        <div className='edit-section-outer'>
            <div className='edit-section-bar'>
                <div>Edit Section</div>
            </div>
            <form onSubmit={onSubmit} className='edit-section-form'>
                <div className='errors-handler-section'>
                    {errors.map((error, ind) => (
                        <div key={ind}>* {error}</div>
                    ))}
                </div>
                <div className='section-Intro'>(change section name)</div>
                <label>
                    <input type='text' name='name' value={name} onChange={e=>setName(e.target.value)}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default EditSection;
