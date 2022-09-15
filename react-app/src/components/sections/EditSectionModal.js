import React from 'react'
import { Modal } from "../context/Modal";
import EditSection from './editSection';

function EditSectionModal({onClose, projectId, id}){
    return (
        <>
            <Modal onClose={onClose}>
                <EditSection onClose={onClose} projectId={projectId} id={id} />
            </Modal>
        </>
    )
}
export default EditSectionModal;
