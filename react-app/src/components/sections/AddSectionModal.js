import React from 'react'
import { Modal } from "../context/Modal";
import AddSection from './addSection';

function AddSectionModal({onClose, projectId}){
    return(
        <>
            <Modal onClose={onClose}>
                <AddSection onClose={onClose} projectId={projectId} />
            </Modal>
        </>
    )
}
export default AddSectionModal;
