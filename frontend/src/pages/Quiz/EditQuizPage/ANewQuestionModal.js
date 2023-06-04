import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ANewQuestionModal({setOption}) {
  const handleClose = () => {
    setOption(-1);
  }

  return (
    <Modal
      show={true}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don not even try to press
        escape key.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer>
    </Modal>
  )
}
