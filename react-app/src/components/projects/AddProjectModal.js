import React, {useState} from 'react'
import { Modal } from "../context/Modal";
import NewProject from './AddProject';

function AddProjectModal(){
    const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>
            <button className='add-Task' onClick={()=>setShowModal(true)}>
               +
            </button>

            {showModal&&(
                <Modal onClose={() => setShowModal(false)}>
                    <NewProject />
                </Modal>
      )}
        </>
    )
}

export default AddProjectModal
