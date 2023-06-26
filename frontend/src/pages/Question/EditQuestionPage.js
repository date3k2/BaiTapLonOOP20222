import React, { useState, useEffect } from "react";
import { Button, Container, NavDropdown, Stack } from "react-bootstrap";
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import { Col, Form, Row, Card } from 'react-bootstrap';
import alert from "../../icons/alert.png";
import apiServices from '../../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Question } from '../../models/Question'
import { Choice } from '../../models/Choice'

export default function EditQuestionPage() {
  let choiceMarkList =
    [1, 0.9, 0.8333333, 0.8, 0.75, 0.7, 0.6666667, 0.6, 0.5, 0.4, 0.3333333,
      0.3, 0.25, 0.2, 0.1666667, 0.1428571, 0.125, 0.1111111, 0.1, 0.05];
  let tmp = [];
  for (let i = 0; i < choiceMarkList.length; ++i) {
    tmp[i] = -choiceMarkList[choiceMarkList.length - i - 1];
  }
  choiceMarkList = choiceMarkList.concat(tmp);

  const [isEdit, setIsEdit] = useState(false);
  const [filledName, setFilledName] = useState("");
  const [filledText, setFilledText] = useState("");
  const [choices, setChoices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('questionID');
    if (paramValue != null) {
      setIsEdit(true);
    }
    else {
      setChoices([{ choiceText: "", choiceMark: 0 }, { choiceText: "", choiceMark: 0 }]);
    }
    // console.log(paramValue);
    apiServices.getQuestion(paramValue)
      .then(res => {
        setFilledName(res.data.questionCode)
        setFilledText(res.data.questionText)
        setChoices(res.data.questionChoices)
        setCategoryID(res.data.categoryId)
      })
      .catch(error => console.log(error));

    apiServices.getCategory()
      .then(res => {
        setCategories(res.data)
      })
      .catch(error => console.log(error));
  }, [])

  const handleChangeName = (event) => {
    setFilledName(event.target.value);
  };
  const handleChangeText = (event) => {
    setFilledText(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategoryID(event.target.value);
  }

  const handleUpdateChoices = (index, key, newValue) => {
    setChoices(prevChoices => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index][key] = newValue;
      return updatedChoices;
    });
  }

  const handleSaveAndContinueInEditPage = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.choiceText !== "");
    let totalchoiceMark = 0;
    for (let i = 0; i < filteredChoices.length; ++i) {
      if (filteredChoices[i].choiceMark > 0)
        totalchoiceMark = totalchoiceMark + Number(filteredChoices[i].choiceMark);
    }
    if (totalchoiceMark !== 1) {
      toast.warning("Total choice mark must be 100%");
      return;
    }
    const QuestionChoices = [];
    let countPositiveChoiceGrade = 0;
    let moreThanOneChoice = false;
    for (let i = 0; i < filteredChoices.length; ++i) {
      QuestionChoices[i] = new Choice(filteredChoices[i].choiceMark, filteredChoices[i].choiceText, null);
      if (filteredChoices[i].choiceMark > 0 ) countPositiveChoiceGrade++;
    };
    if (countPositiveChoiceGrade > 1) moreThanOneChoice = true;
    else moreThanOneChoice = false;
    const questionData = new Question(categoryID, filledName, filledText, moreThanOneChoice, null, QuestionChoices);
    console.log(questionData);
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('questionID');
    apiServices.putQuestion(questionData, paramValue)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
  };

  const handleSaveInEditPage = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.choiceText !== "");
    let totalchoiceMark = 0;
    for (let i = 0; i < filteredChoices.length; ++i) {
      if (filteredChoices[i].choiceMark > 0)
        totalchoiceMark = totalchoiceMark + Number(filteredChoices[i].choiceMark);
    }
    if (totalchoiceMark !== 1) {
      toast.warning("Total choice mark must be 100%");
      return;
    }
    const QuestionChoices = [];
    let countPositiveChoiceGrade = 0;
    let moreThanOneChoice = false;
    for (let i = 0; i < filteredChoices.length; ++i) {
      QuestionChoices[i] = new Choice(filteredChoices[i].choiceMark, filteredChoices[i].choiceText, null);
      if (filteredChoices[i].choiceMark > 0 ) countPositiveChoiceGrade++;
    };
    if (countPositiveChoiceGrade > 1) moreThanOneChoice = true;
    else moreThanOneChoice = false;
    const questionData = new Question(categoryID, filledName, filledText, moreThanOneChoice, null, QuestionChoices);
    console.log(questionData);
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('questionID');
    apiServices.putQuestion(questionData, paramValue)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
    navigate('/')
  };

  const handleSaveAndContinueInAddPage = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.choiceText !== "");
    let totalchoiceMark = 0;
    for (let i = 0; i < filteredChoices.length; ++i) {
      if (filteredChoices[i].choiceMark > 0)
        totalchoiceMark = totalchoiceMark + Number(filteredChoices[i].choiceMark);
    }
    if (totalchoiceMark !== 1) {
      toast.warning("Total choice mark must be 100%");
      return;
    }
    const QuestionChoices = [];
    let countPositiveChoiceGrade = 0;
    let moreThanOneChoice = false;
    for (let i = 0; i < filteredChoices.length; ++i) {
      QuestionChoices[i] = new Choice(filteredChoices[i].choiceMark, filteredChoices[i].choiceText, null);
      if (filteredChoices[i].choiceMark > 0 ) countPositiveChoiceGrade++;
    };
    if (countPositiveChoiceGrade > 1) moreThanOneChoice = true;
    else moreThanOneChoice = false;
    const questionData = new Question(categoryID, filledName, filledText, moreThanOneChoice, null, QuestionChoices);
    console.log(questionData);
    let param = "";
    apiServices.postQuestion(questionData)
      .then(res => {
        param = res.data
        navigate(`/question/edit?questionID=${param}`)
      })
      .catch(error => console.log(error));
  };

  const handleSaveInAddPage = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.choiceText !== "");
    let totalchoiceMark = 0;
    for (let i = 0; i < filteredChoices.length; ++i) {
      if (filteredChoices[i].choiceMark > 0)
        totalchoiceMark = totalchoiceMark + Number(filteredChoices[i].choiceMark);
    }
    if (totalchoiceMark !== 1) {
      toast.warning("Total choice mark must be 100%");
      return;
    }
    const QuestionChoices = [];
    let countPositiveChoiceGrade = 0;
    let moreThanOneChoice = false;
    for (let i = 0; i < filteredChoices.length; ++i) {
      QuestionChoices[i] = new Choice(filteredChoices[i].choiceMark, filteredChoices[i].choiceText, null);
      if (filteredChoices[i].choiceMark > 0 ) countPositiveChoiceGrade++;
    };
    if (countPositiveChoiceGrade > 1) moreThanOneChoice = true;
    else moreThanOneChoice = false;
    const questionData = new Question(categoryID, filledName, filledText, moreThanOneChoice, null, QuestionChoices);
    console.log(questionData);
    apiServices.postQuestion(questionData)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
    navigate('/')
  };

  return (
    <Container className="border p-2">
      {isEdit ?
        <p style={{ color: "red", fontSize: "30px" }}>
          Editing a Multiple choice question
        </p> :
        <p style={{ color: "red", fontSize: "30px" }}>
          Adding a Multiple choice question
        </p>
      }
      <div style={{ padding: "25px" }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            disabled
            style={{ color: "blue", fontSize: "25px" }}
          ></NavDropdown>
          <Navbar.Text style={{ color: "red", fontSize: "25px" }}>
            General
          </Navbar.Text>
        </Stack>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: "20px" }}>
            Category
          </Form.Label>
          <Col>
            <Form.Select value={categoryID} onChange={handleChangeCategory} style={{ marginLeft: "20px", width: "350px" }}>
              <option value={0}> Default </option>
              {categories.map((category) => (
                <option value={category.id}> {category.name}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: "20px" }}>
            Question name
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width="13" height="13" alt="img" />
              <Form.Control
                value={filledName}
                onChange={handleChangeName}
                type="text"
                placeholder="Question name"
                style={{ width: "480px" }}
              />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: "20px" }}>
            Question text
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img
                src={alert}
                width="13"
                height="13"
                style={{ marginBottom: "260px" }}
                alt="Img"
              />
              <Form.Control value={filledText} onChange={handleChangeText}
                type="text"
                placeholder="Question text"
                as="textarea"
                style={{ height: "300px" }}
              />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: "20px" }}>
            Default mark
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width="13" height="13" alt="Img" />
              <Form.Control
                type="text"
                style={{ width: "100px" }}
                defaultValue={1}
              />
            </Stack>
          </Col>
        </Form.Group>
        <br />
        {
          choices.map((choice, index) => (
            <Card
              style={{
                width: "550px",
                height: "300px",
                marginLeft: "560px",
                marginTop: "20px",
                backgroundColor: "#f0eeed",
              }}
            >
              <Card.Body>
                <Form.Group as={Row}>
                  <Form.Label column style={{ fontSize: "20px" }}>
                    Choice {index + 1}
                  </Form.Label>
                  <Col>
                    <Form.Control
                      onChange={event => handleUpdateChoices(index, 'choiceText', event.target.value)}
                      value={choice.choiceText}
                      as="textarea"
                      type="text"
                      style={{ width: "410px", height: "80px" }}
                    />
                  </Col>
                </Form.Group>
                <br />
                <Form.Group as={Row}>
                  <Form.Label column style={{ fontSize: "20px" }}>
                    Grade
                  </Form.Label>
                  <Col>
                    <Form.Select
                      value={choice.choiceMark}
                      onChange={event => handleUpdateChoices(index, 'choiceMark', event.target.value)}
                      style={{ marginRight: "250px", width: "160px" }}
                    >
                      <option value={0}> None</option>
                      {choiceMarkList.map((choiceMark) => (
                        <option value={choiceMark}> {choiceMark*100}%</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Form.Group>
              </Card.Body>
            </Card>
          ))
        }
        <Button
          onClick={() => {
            setChoices(choices => [...choices, { choiceText: "", choiceMark: 0 }, { choiceText: "", choiceMark: 0 }, { choiceText: "", choiceMark: 0 }])
          }
          }
          variant="primary"
          style={{ marginLeft: "550px", marginTop: "50px" }}
        >
          BLANKS FOR 3 MORE CHOICES
        </Button>
        <br />
        <Button
          onClick={isEdit ? handleSaveAndContinueInEditPage : handleSaveAndContinueInAddPage}
          variant="primary"
          style={{ marginLeft: "500px", marginTop: "60px" }}
        >
          SAVE CHANGE AND CONTINUE EDITING
        </Button>
        <ToastContainer hideProgressBar autoClose={3000}></ToastContainer>
        <br />
        <Button
          onClick={isEdit ? handleSaveInEditPage : handleSaveInAddPage}
          variant="danger"
          style={{ marginLeft: "500px", marginTop: "30px" }}
        >
          SAVE CHANGES
        </Button>
        <Button
          variant="primary"
          style={{ marginLeft: "20px", marginTop: "30px" }}
          href="/"
        >
          CANCEL
        </Button>
      </div>
    </Container >
  );
}