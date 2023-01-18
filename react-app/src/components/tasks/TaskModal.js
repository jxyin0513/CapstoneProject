import React, {useState} from 'react'
import { Modal } from "../context/Modal";
import AddTask from './AddTask';
import './TaskModal.css'

function AddTaskModal({onClose}){
    // const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>
            {/* <button className='add-Task' onClick={()=>setShowModal(true)}>
               + Add task
            </button> */}


                <Modal onClose={onClose}>
                    <AddTask onClose={onClose} />
                </Modal>

        </>
    )
}

export default AddTaskModal;
