import React, {useState} from 'react'
import { Modal } from "../context/Modal";
import AddTask from './AddTask';
import './TaskModal.css'

function AddTaskModal(){
    const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>
            <button className='add-Task' onClick={()=>setShowModal(true)}>
               + Add task
            </button>

            {showModal&&(
                <Modal onClose={() => setShowModal(false)}>
                    <AddTask onClose={() => setShowModal(false)} />
                </Modal>
      )}
        </>
    )
}

export default AddTaskModal;
