import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function MessageModal({ message, title, show, setShow,actionHandle = () => {} }) {
  return (
    <>
      <Modal show={show} onHide={ () =>  {
            setShow(false)
             actionHandle()
             }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            setShow(false)
             actionHandle()
             }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MessageModal;
