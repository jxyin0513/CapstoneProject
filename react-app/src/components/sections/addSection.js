import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSectionThunk } from '../../store/section';

function AddSection({onClose, projectId}){
    const dispatch = useDispatch()
    // const history = useHistory()
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
        <div>
            <form onSubmit={onSubmit}>
                <div className='errors-handler-Project'>
                    {errors.map((error, ind) => (
                        <div key={ind}>* {error}</div>
                    ))}
                </div>
                <label>
                    <input type='text' name='name' placeholder='add section' onChange={e=>setName(e.target.value)}></input>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default AddSection;
