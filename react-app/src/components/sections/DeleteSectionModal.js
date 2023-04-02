import React from 'react';
import {  useDispatch } from 'react-redux';
import { Modal } from '../context/Modal';
import { deleteSectionThunk } from '../../store/section';
import './DeleteSectionModal.css'

function DeleteSectionModal({id, onClose}){
    const dispatch = useDispatch();
    // const history = useHistory();
    async function onDelete(e){
        e.preventDefault();
        const deleted =  await dispatch(deleteSectionThunk(id))
        if(!deleted){
            onClose()
        }
    }
    return (
        <>
            <Modal onClose={onClose}>
                <div className='delete-Section-Container'>
                    <div className='delete-Message'>Delete the section?</div>
                    <div className='delete-section-header'>This will delete the section, along with:</div>
                    <ul>
                        <li>Tasks that in this section</li>
                    </ul>

                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </Modal>
        </>
    )

}
export default DeleteSectionModal;
