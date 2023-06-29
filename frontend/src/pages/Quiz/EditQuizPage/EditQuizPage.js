import React, { useEffect } from "react";
import { Container, Col, Stack, Button, Dropdown, Form } from "react-bootstrap";
import { BsFillPencilFill, BsZoomIn, BsFillTrash3Fill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import questionmark from "../../../icons/questionmark.png";
import { useState } from "react";
import apiServices from '../../../services/apiServices'
import { useLocation, useParams } from "react-router-dom";
import ANewQuestionModal from "./ANewQuestionModal";
import FromQuestionBankModal from "./FromQuestionBankModal";
import ARandomQuestionModal from "./ARandomQuestionModal";
import { toast, ToastContainer } from "react-toastify";

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

function QuizQuestion({isSelect, question, index, chosenQuestion, setChosenQuestion, setQuizQuestions, quizQuestions}) {

  const handleDelete = () => {
    setQuizQuestions(quizQuestions.filter(item => item.questionId !== question.questionId))
  }

  const handleSelect = () => {
    if(chosenQuestion.includes(question.questionId)){
      setChosenQuestion(chosenQuestion.filter(item => item != question.questionId))
    } else {
      setChosenQuestion([...chosenQuestion, question.questionId])
    }
  }

  return (
    <Stack className="mb-1 p-1" direction="horizontal" style={{backgroundColor: '#f0f0f0'}}>
      {isSelect && <Form.Check checked={chosenQuestion.includes(question.questionId)} onChange={handleSelect}></Form.Check>}
      <p className="m-0 me-1 px-2" style={{backgroundColor: '#d9d7d7'}}>{index}</p>
      <p className="m-0">{question.questionText}</p>
      <BsZoomIn className="ms-auto me-3" />
      <BsFillTrash3Fill style={{cursor:'pointer'}} onClick={handleDelete} className="me-3" />
      <input disabled type="text" value="1.00"  size={3}/>
    </Stack>
  );
}

export default function EditQuizPage() {

  const [maxGrade, setTotalGrade] = useState(10.0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [addOption, setAddOption] = useState(-1);
  const [isSelectMultiple, setIsSelectMultiple] = useState(false);
  const [chosenQuestion, setChosenQuestion] = useState([]);
  const [quizData, setQuizData] = useState();
  const path = useLocation();
  const pathArr = path.pathname.split('/')[1].split('+');
  const quizId = pathArr[pathArr.length - 1];

  const options = [
    <ANewQuestionModal setOption={setAddOption} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} />, 
    <FromQuestionBankModal setOption={setAddOption} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} />, 
    <ARandomQuestionModal setOption={setAddOption} quizQuestions={quizQuestions} setQuizQuestions={setQuizQuestions} />
  ]

  useEffect(() => {
    apiServices.getQuiz(quizId)
    .then(res => {
      setQuizQuestions(res.data.questions);
      setQuizData(res.data);
      setTotalGrade(res.data.maxGrade);
      setIsShuffle(res.data.isShuffle);
    })
    .catch(err => console.log(err));
  }, [])

  const handleOnClick = () => {
    setIsShuffle(!isShuffle);
  };

  const handleDelete = () => {
    let newQuizQuestions = quizQuestions;
    for(let i = 0 ; i < chosenQuestion.length ; ++i)
    newQuizQuestions = newQuizQuestions.filter(item => item.questionId !== chosenQuestion[i]);
    setQuizQuestions(newQuizQuestions);
    setChosenQuestion([]);
  }

  const handleCancel = () => {
    setIsSelectMultiple(false);
    setChosenQuestion([]);
  }

  const handleSubmit = () => {
    // console.log(typeof quizData)
    delete quizData['questions'];
    let quizQuestionId = quizQuestions.map(question => question.questionId);
    quizData.listQuestionId = quizQuestionId;
    quizData.maxGrade = Number(maxGrade);
    quizData.isShuffle = isShuffle;
    // console.log(quizData);
    apiServices.putQuiz(quizData.quizId, quizData)
    .then(res => toast.success('Change quiz successfully'))
    .catch(err => console.log(err));
  }

  return (
    <Container className="border p-2">
      <Stack direction="horizontal" gap={1}>
        <div style={{ color: "red", fontSize: "35px" }}>
          Editing quiz: {quizData ? quizData.quizName : null}
        </div>
        <img src={questionmark} style={{ width: "15px", height: "15px" }} />
      </Stack>

      <Stack className="my-1" direction="horizontal">
        <Col style={{ fontSize: "16px" }}>Question: {quizQuestions.length} | This quiz is open</Col>
        <div className="d-flex gap-1 align-items-center">
          <Col>Maximum grade</Col>
          <input type="text" className="form-control" style={{ width: "70px" }} value={maxGrade} onChange={e => setTotalGrade(e.target.value)} />
          <Button type="button" style={{ backgroundColor: "#0081C9" }} onClick={handleSubmit}>
            SAVE
          </Button>
        </div>
      </Stack>

      <Stack direction="horizontal">
        <div className="d-flex gap-1 align-items-center">
          <Button type="button" style={{ backgroundColor: "#0081C9" }}>
            REPAGINATE
          </Button>
          <Button type="button" style={{ backgroundColor: "#0081C9" }} onClick={() => setIsSelectMultiple(true)}>
            SELECT MULTIPLE ITEMS
          </Button>
        </div>
        <Col
          className="d-flex justify-content-end"
          style={{ fontSize: "16px" }}
        >
          Total of marks: {(quizQuestions.length).toFixed(2)}
        </Col>
      </Stack>

      <Container className="my-3" style={{ background: "#F2EFEA" }}>
        <Stack direction="horizontal" gap={1}>
          <BsFillPencilFill size={12} color="0081C9" />
          <Col className="d-flex justify-content-end">
            <Button
              variant={isShuffle ? "success" : "outline-secondary"}
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
              {isShuffle && "\u2713"}
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

      {quizQuestions.length > 0 &&
        quizQuestions.map((data, index) => 
          <QuizQuestion
            isSelect={isSelectMultiple} 
            question={data} index={index} 
            key={index} 
            chosenQuestion={chosenQuestion} 
            setChosenQuestion={setChosenQuestion} 
            setQuizQuestions={setQuizQuestions} 
            quizQuestions={quizQuestions}
          />
        )
      }

      {
        isSelectMultiple && 
        <Stack direction="horizontal">
          <Button className="me-2" onClick={handleDelete}>Delete</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Stack>
      }

      <div className="col-md-1 mx-auto" style={{ marginTop: "50px" }}>
        <select style={{ width: "150px" }}>
          <option value="">
            Jump to...
          </option>
        </select>
      </div>

      <ToastContainer hideProgressBar autoClose={3000} />
    </Container>
  );
}
