import React, { useState, useEffect } from "react";
import { Container, Stack, Col, Row, Button } from "react-bootstrap";
import { MdArrowDropDownCircle } from "react-icons/md";
import PreviewQuizModal from "./PreviewQuizModal";
import apiServices from "../../services/apiServices";
import { Link, useLocation, useParams } from "react-router-dom";

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60); 
  const hours = Math.floor(seconds / 3600);
  const remainingMinutes = minutes % 60; 
  // const formattedHours = String(hours).padStart(2, '0'); 
  // const formattedMinutes = String(remainingMinutes).padStart(2, '0'); 
  // return `${formattedMinutes}hours:${formattedMinutes}minutes`; 
  return (hours ? hours + (hours > 1 ? ' hours ' : ' hour ') : '') + (remainingMinutes ? remainingMinutes + (remainingMinutes > 1 ? ' minutes' : ' minute') : '');
}
export default function PreviewQuiz() {
    
  const [quizData, setQuizData] = useState();
  const [openModal, setOpenModal] = useState(false);
  const path = useLocation();
  const pathArr = path.pathname.split('+');
  const quizId = pathArr[pathArr.length - 1];

  useEffect(() => {
    apiServices.getQuiz(quizId)
    .then((res) => setQuizData(res.data))
    .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="border pl-4">
      <Row>
        <Col style={{ color: "red", fontSize: "25px" }}>{quizData ? quizData.quizName : null}</Col>
        <Col className="d-flex justify-content-end">
          <a href={`${path.pathname}/edit`}>
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
          <p>Time limit: {quizData ? formatTime(quizData.timeLimitInSeconds) : null}</p>
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
          >
            PREVIEW QUIZ NOW
          </Button>
          <PreviewQuizModal open={openModal} onClose={() => setOpenModal(false)} timeLimit = {quizData ? formatTime(quizData.timeLimitInSeconds) : null} path={path.pathname} />
        </div>
      </Row>
    </Container>
  );

  
}
