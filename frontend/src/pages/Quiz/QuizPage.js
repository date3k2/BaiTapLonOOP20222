import React from "react";
import { Container, Stack, Col, Row, Button } from "react-bootstrap";
import { MdArrowDropDownCircle } from "react-icons/md";

export default function PreviewQuiz() {

  const path = window.location.pathname;

  return (
    <Container className="border pl-4">
      <Row>
        <Col style={{ color: "red", fontSize: "25px" }}>
          Thi giữa kì 2 môn Công nghệ
        </Col>
        <Col className="d-flex justify-content-end">
          <a href={`${path}/edit`}>
            <MdArrowDropDownCircle
              size={40}
              color="#0081C9"
            />
          </a>
        </Col>
      </Row>
      <Row className="mt-4">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Time limit: 1 hour</p>
          <p>Grading method: Last grade</p>
        </div>
      </Row>
      <Row>
        <div style={{ color: "red", fontSize: "20px" }}>
          Summary of your previous attempt
        </div>
      </Row>
      <Row className="mt-2">
        <Stack>
          <Stack
            direction="horizontal"
            className="border p-2"
            style={{ color: "white", backgroundColor: "#0081C9" }}
          >
            <Col style={{ textAlign: "center" }}> Attempt </Col>
            <Col> State </Col>
          </Stack>
          <Stack
            direction="horizontal"
            className="border p-2"
            style={{ color: "black", backgroundColor: "#F1F6F5" }}
          >
            <Col style={{ textAlign: "center" }}> Preview </Col>
            <Col> Never submitted </Col>
          </Stack>
        </Stack>
      </Row>

      <Row className="my-5">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            type="button"
            style={{ backgroundColor: "#0081C9" }}
            href="/previewquiz"
          >
            PREVIEW QUIZ NOW
          </Button>
        </div>
      </Row>
      <div className="col-md-1 mx-auto ">
        <select>
          <option value="" selected="">
            Jump to...
          </option>
        </select>
      </div>
    </Container>
  );
}
