import React, { useState, useEffect } from "react";
import { Container, Stack, Col, Row, Button } from "react-bootstrap";
import { MdArrowDropDownCircle } from "react-icons/md";
import PreviewQuizModal from "./PreviewQuizModal";
import apiServices from "../../services/apiServices";

export default function PreviewQuiz() {
  //  const path = window.location.pathname;
  const [QuizList, setQuizList] = useState([]);

  useEffect(() => {
    apiServices
      .getQuiz()
      .then((res) => setQuizList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [quizName, setQuizName] = useState("");

  useEffect(() => {
    setQuizName(decodeURIComponent(window.location.pathname.slice(1)));
  }, []);

  const timeLimit = QuizList.reduce((acc, quiz) => {
    if (quiz.quizName === quizName) {
      return quiz.timeLimit;
    }
    return acc;
  }, null);

  return (
    <Container className="border pl-4">
      <Row>
        <Col style={{ color: "red", fontSize: "25px" }}>{quizName}</Col>
        <Col className="d-flex justify-content-end">
          <a href={`${quizName}/edit`}>
            <MdArrowDropDownCircle size={40} color="#0081C9" />
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
          <p>Time limit: {timeLimit} minutes</p>
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
            style={{ backgroundColor: "#0081C9" }}
            onClick={() => setOpenModal(true)}
            //href="/previewquiz"
          >
            PREVIEW QUIZ NOW
          </Button>
          <PreviewQuizModal open={openModal} onClose={() => setOpenModal(false)} timeLimit = {timeLimit}/>
        </div>
      </Row>
    </Container>
  );

  
}
