import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSectionThunk } from '../../store/section';
import './addSection.css'

function AddSection({onClose, projectId}){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    async function onSubmit(e){
        e.preventDefault();
        const section = {
            projectId,
            name
        }
        const newSection = await dispatch(createSectionThunk(section))
        if(!newSection){
            onClose();
        }else{
            setErrors(newSection)
        }
    }
    return (
        <div className='add-section-form'>
            <div className='new-section-bar'>Add New Section</div>
            <form onSubmit={onSubmit} className='section-form'>
                <div className='errors-handler-section'>
                    {errors.map((error, ind) => (
                        <div key={ind}>* {error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='name' placeholder='section name' onChange={e=>setName(e.target.value)}></input>
                </label>
                <button className='section-button' type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default AddSection;
