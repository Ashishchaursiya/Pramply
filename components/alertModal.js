import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function AlertModal({ message, title, show, setShow,actionHandle = () => {} }) {
  return (
    <>
      <Modal show={show} onHide={ () =>  {
            setShow(false)
             }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            setShow(false)
             }}>
            No
          </Button>
          <Button variant="primary" onClick={() => {
            setShow(false)
             actionHandle()
             }}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;
