import React from "react";
import { Button, Modal } from "react-bootstrap";
const MOdal = ({ open, onClose, timeLimit }) => {
  if (!open) return null;
  return (
    <Modal show={true} onHide={onClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            fontSize: "1.5rem",
            fontWeight: "400",
            padding: "0px 0px",
          }}
        >
          Start attempt
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3
          style={{
            fontWeight: "350",
            color: "inherit",
            fontSize: "1.5rem",
            paddingLeft: "20px",
          }}
        >
          Time limit
        </h3>
        <p
          style={{
            fontSize: ".9375rem",
            fontWeight: "400",
            color: "#373a3c",
            paddingLeft: "20px",
          }}
        >
          Your attempt will have a time limit of {timeLimit} minutes. When you
          start, the timer will begin to count down and cannot be paused. You
          must finish your attempt before it expires. Are you sure you wish to
          start now?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: "#1177d1",
            borderColor: "#1177d1",
            padding: "0.375rem 0.75rem",
            fontSize: "0.9375rem",
            borderRadius: "4px",
            fontWeight: "400",
   
          }}
        >
          Start attempt
        </Button>
        <Button
          style={{
            color: "#212529",
            backgroundColor: "#e9ecef",
            borderColor: "#e9ecef",
            fontWeight: "400",
            padding: "0.375rem 0.75rem",
            fontSize: "0.9375rem",
            borderRadius: "4px",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MOdal;
