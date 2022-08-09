import React, {useState} from 'react'
import { Modal } from "../context/Modal";
import EditProject from './EditProject';

function EditProjectModal({onClose}){
    // const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>
            {/* <button className='add-Task' onClick={()=>setShowModal(true)}>
               +
            </button> */}


                <Modal onClose={onClose}>
                    <EditProject />
                </Modal>

        </>
    )
}

export default EditProjectModal
