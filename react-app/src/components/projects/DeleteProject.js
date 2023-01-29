import React from 'react';
import {  useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom';
import { Modal } from '../context/Modal';
import { DeleteProjects } from '../../store/projects';
import './DeleteProjectModal.css'

function DeleteProjectModal({id, onClose}){
    const dispatch = useDispatch();
    const history = useHistory();
    async function onDelete(e){
        e.preventDefault();
        const deleted =  await dispatch(DeleteProjects(id))
        if(!deleted){
            history.push('/')
        }
    }
    return (
        <>
            <Modal onClose={onClose}>
                <div className='delete-Project-Container'>
                    <div className='delete-Message'>Delete the project?</div>
                    <div className='delete-project-Intro'>This will delete the project, along with:</div>
                    <ul>
                        <li>Tasks that assigned in this project</li>
                        <li>Members of this projects</li>
                    </ul>

                    <button onClick={onClose}>Cancel</button>
                    <button onClick={onDelete}>Delete</button>
                </div>
            </Modal>
        </>
    )
}

export default DeleteProjectModal;
