import React from 'react'
import { Modal } from "../context/Modal";
import EditProject from './EditProject';

function EditProjectModal({onClose}){

    return (
        <>



            <Modal onClose={onClose}>
                <EditProject onClose={onClose}/>
            </Modal>

        </>
    )
}

export default EditProjectModal
