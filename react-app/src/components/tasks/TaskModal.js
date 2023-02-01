import React from 'react'
import { Modal } from "../context/Modal";
import AddTask from './AddTask';
import './TaskModal.css'

function AddTaskModal({onClose}){

    return (
        <>
            <Modal onClose={onClose}>
                <AddTask onClose={onClose} />
            </Modal>
        </>
    )
}

export default AddTaskModal;
