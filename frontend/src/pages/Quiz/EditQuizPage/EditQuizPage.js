import React, { useEffect } from "react";
import { Container, Col, Stack, Button, Dropdown, Table } from "react-bootstrap";
import { BsFillPencilFill, BsZoomIn, BsFillTrash3Fill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import questionmark from "../../../icons/questionmark.png";
import { useState } from "react";
import apiServices from '../../../services/apiServices'
import { useParams } from "react-router-dom";
import ANewQuestionModal from "./ANewQuestionModal";
import FromQuestionBankModal from "./FromQuestionBankModal";
import ARandomQuestionModal from "./ARandomQuestionModal";

function HandleHighlight(props) {
  const [isHover, setIsHover] = useState(null);
  const isHovered = () => {
    return (props.id === isHover);
  };
  return (
    <Stack
      direction="horizontal"
      style={{ backgroundColor: isHovered() ? "lightblue" : "white" }}
      onMouseOver={() => {
        setIsHover(props.id)}
      }
      onMouseOut={() => setIsHover(null)}
      onClick={props.onClick}
    >
      <Col className="d-flex justify-content-center" xs={3}>
        <ImPlus size={15} color="#0081C9" />
      </Col>
      <Col> {props.name} </Col>
    </Stack>
  );
}

function QuizQuestion({question, index}) {
  return (
    <Stack className="mb-1 p-1" direction="horizontal" style={{backgroundColor: '#f0f0f0'}}>
      <p className="m-0 me-1 px-2" style={{backgroundColor: '#d9d7d7'}}>{index}</p>
      <p className="m-0">{question.questionName + question.questionText}</p>
      <BsZoomIn className="ms-auto me-3" />
      <BsFillTrash3Fill className="me-3" />
      <input disabled type="text" value="1.00"  size={3}/>
    </Stack>
  );
}

export default function EditQuizPage() {

  const [isChecked, setIsChecked] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState([]);
  const [addOption, setAddOption] = useState(-1);

  const options = [<ANewQuestionModal setOption={setAddOption} />, <FromQuestionBankModal setOption={setAddOption} />, <ARandomQuestionModal setOption={setAddOption} />]

  const data = useParams();

  useEffect(() => {
    apiServices.getQuizQuestion(data.quizName)
    .then(res => setQuizQuestion(res.data))
    .catch(err => console.log(err));
  }, [])

  const handleOnClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Container className="border p-2">
      <Stack direction="horizontal" gap={1}>
        <div style={{ color: "red", fontSize: "35px" }}>
          Editing quiz: {data.quizName}
        </div>
        <img src={questionmark} style={{ width: "15px", height: "15px" }} />
      </Stack>

      <Stack className="my-1" direction="horizontal">
        <Col style={{ fontSize: "16px" }}>Question: {quizQuestion.length} | This quiz is open</Col>
        <div className="d-flex gap-1 align-items-center">
          <Col>Maximum grade</Col>
          <input
            type="text"
            className="form-control"
            style={{ width: "60px" }}
          />
          <Button
            type="button"
            style={{ backgroundColor: "#0081C9" }}
            href="/previewquiz/editquiz"
          >
            SAVE
          </Button>
        </div>
      </Stack>

      <Stack direction="horizontal">
        <div className="d-flex gap-1 align-items-center">
          <Button type="button" style={{ backgroundColor: "#0081C9" }}>
            REPAGINATE
          </Button>
          <Button type="button" style={{ backgroundColor: "#0081C9" }}>
            SELECT MULTIPLEITEMS
          </Button>
        </div>
        <Col
          className="d-flex justify-content-end"
          style={{ fontSize: "16px" }}
        >
          Total of marks: {(quizQuestion.length).toFixed(2)}
        </Col>
      </Stack>

      <Container className="my-3" style={{ background: "#F2EFEA" }}>
        <Stack direction="horizontal" gap={1}>
          <BsFillPencilFill size={12} color="0081C9" />
          <Col className="d-flex justify-content-end">
            <Button
              variant={isChecked ? "success" : "outline-secondary"}
              onClick={handleOnClick}
              style={{
                width: "15px",
                height: "15px",
                borderRadius: "5px",
                padding: "0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isChecked && "\u2713"}
            </Button>
          </Col>
          <div>Shuffle</div>
          <img src={questionmark} style={{ width: "15px", height: "15px" }} />
        </Stack>

        <div className="d-flex justify-content-end">
          <Dropdown className="pt-2" drop="down" align={"end"}>
            <Dropdown.Toggle className="d-flex align-items-center">
              <div>Add</div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Container className="d-flex" style={{ width: "250px" }}>
                <Stack>
                  <HandleHighlight name={"a new question"} id={0} onClick={() => setAddOption(0)} />
                  <HandleHighlight name={"from question bank"} id={1} onClick={() => setAddOption(1)} />
                  <HandleHighlight name={"a random question"} id={2} onClick={() => setAddOption(2)} />
                </Stack>
              </Container>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
            
      {
        addOption != -1 && options[addOption]
      }

      {quizQuestion.length > 0 &&
        quizQuestion.map((data, index) => <QuizQuestion question={data} index={index} />)
      }

      <div className="col-md-1 mx-auto" style={{ marginTop: "250px" }}>
        <select style={{ width: "150px" }}>
          <option value="">
            Jump to...
          </option>
        </select>
      </div>
    </Container>
  );
}
