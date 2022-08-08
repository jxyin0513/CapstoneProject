import React, {useState} from 'react'
import { Modal } from "../context/Modal";
import AddTask from './AddTask';

function AddTaskModal(){
    const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>
            <button onClick={()=>setShowModal(true)}>
                Add Task
            </button>

            {showModal&&(
                <Modal onClose={() => setShowModal(false)}>
                    <AddTask />
                </Modal>
      )}
        </>
    )
}

export default AddTaskModal;
