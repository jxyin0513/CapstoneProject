import React from 'react'
import { Modal } from "../context/Modal";
import EditTasks from './EditTask';

function EditTaskModal({onEdit, onClose, id}){
    // const [showModal, setShowModal] = useState(false);
    // const [demoUser, setDemoUser] = useState(false)
    return (
        <>

            {(
                <Modal onClose={onClose}>
                    <EditTasks onEdit={onEdit} id={id} onClose={onClose} />
                </Modal>
      )}
        </>
    )
}
export default EditTaskModal;
