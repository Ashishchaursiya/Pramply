import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ message, title, showDeleteModal, setShowDeleteModal,deleteHandler,setEditEmploymentModal }) {
  return (
    <>
      <Modal show={showDeleteModal} onHide={ () => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {setShowDeleteModal(false)
          setEditEmploymentModal(true)
          }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={deleteHandler}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
