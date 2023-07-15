import React, { useState } from "react";
import { Button, Container, Form, Modal, Stack } from "react-bootstrap";
import apiServices from "../../services/apiServices";

const PreviewQuizModal = ({quizId, open, onClose, timeLimit, path }) => {

  const [doesExport, setDoesExport] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const reset = () => {
    onClose(); 
    setDoesExport(false); 
    setPassword('');
    setMessage('');
  }

  const handleExport = () => {
    setMessage("Exporting ...");
    apiServices.exportQuiz(quizId, password)
    .then(res => {
      setMessage(`Exported to: ${res.data}`);
    })
    .catch(err => setMessage("Export failed!"));
  }

  if (!open) return null;
  return (
    <Modal show={true} onHide={reset} backdrop="static" keyboard={false}>
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
          Your attempt will have a time limit of {timeLimit}. When you
          start, the timer will begin to count down and cannot be paused. You
          must finish your attempt before it expires. Are you sure you wish to
          start now?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Container className="d-flex justify-content-between">
            <Button className="btn-danger mb-2" onClick={() => setDoesExport(true)}>
              Export quiz
            </Button>
            <Stack direction="horizontal">
              <Button
                style={{
                  backgroundColor: "#1177d1",
                  borderColor: "#1177d1",
                  padding: "0.375rem 0.75rem",
                  fontSize: "0.9375rem",
                  borderRadius: "4px",
                  fontWeight: "400",
                  marginRight: '10px',
                  width: '120px'
                }}
                href={path + '/preview'}
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
                onClick={reset}
              >
                Cancel
              </Button>
            </Stack>
          </Container>
          {
            doesExport ?
            <Container className="mt-2">
              <Form.Control type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password (Leave blank if file does not have password)" />
              {
                message.length > 0 ?
                <p className="m-0 p-0 mt-2 text-primary">{message}</p> :
                null
              }
              <Button className="mt-2 btn-success" onClick={handleExport}>Export</Button>
            </Container> :
            null
          }
        </Container>
      </Modal.Footer>
    </Modal>
  );
};

export default PreviewQuizModal;
