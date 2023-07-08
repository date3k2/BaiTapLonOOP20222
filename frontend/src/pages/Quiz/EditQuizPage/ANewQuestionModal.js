import React, { useState, useEffect } from "react";
import { Button, Container, NavDropdown, Stack, Image, Modal, Col, Form, Row, Card } from "react-bootstrap";
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Navbar from "react-bootstrap/Navbar";
import alert from "../../../icons/alert.png";
import apiServices from '../../../services/apiServices';
import { toast, ToastContainer } from 'react-toastify';
import { Question } from '../../../models/Question'
import { Choice } from '../../../models/Choice'

export default function ANewQuestionModal({setOption, quizQuestions, setQuizQuestions}) {
  const handleClose = () => {
    setOption(-1);
  }

  let choiceMarkList =
    [1, 0.9, 0.8333333, 0.8, 0.75, 0.7, 0.6666667, 0.6, 0.5, 0.4, 0.3333333,
      0.3, 0.25, 0.2, 0.1666667, 0.1428571, 0.125, 0.1111111, 0.1, 0.05];
  let tmp = [];
  for (let i = 0; i < choiceMarkList.length; ++i) {
    tmp[i] = -choiceMarkList[choiceMarkList.length - i - 1];
  }
  choiceMarkList = choiceMarkList.concat(tmp);

  const [filledName, setFilledName] = useState("");
  const [filledText, setFilledText] = useState("");
  const [questionMediaPath, setQuestionMediaPath] = useState();
  const [choices, setChoices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(0);

  const reader = new FileReader();

  const handleChangeName = (event) => {
    setFilledName(event.target.value);
  };
  const handleChangeText = (event) => {
    setFilledText(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setCategoryID(event.target.value);
  }

  const getMediaType = (s) => {
    return s.split(';')[0].split(':')[1].split('/')[0];
  }

  const handleUpdateChoices = (index, key, newValue) => {
    if(key == 'choiceMediaPath'){
      reader.readAsDataURL(newValue);
      reader.onloadend = () => {
        setChoices(prevChoices => {
          const updatedChoices = [...prevChoices];
          updatedChoices[index][key] = reader.result;
          return updatedChoices;
        });
      }
    }
    else setChoices(prevChoices => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index][key] = newValue;
      return updatedChoices;
    });
  }

  const handleSave = () => {
    if (filledName == "" || filledText == "") {
      toast.warning("Question name and text need to be completed");
      return;
    }
    const filteredChoices = choices.filter(choice => choice.choiceText !== "" || choice.choiceMediaPath != null);
    let totalchoiceMark = 0;
    for (let i = 0; i < filteredChoices.length; ++i) {
      if (filteredChoices[i].choiceMark > 0)
        totalchoiceMark = totalchoiceMark + Number(filteredChoices[i].choiceMark);
    }
    if (totalchoiceMark > 1.001 || totalchoiceMark < 0.999) {
      toast.warning("Total grades must be 100%");
      return;
    }
    const QuestionChoices = [];
      let countPositiveChoiceGrade = 0;
      let moreThanOneChoice = false;
      for (let i = 0; i < filteredChoices.length; ++i) {
        QuestionChoices[i] = new Choice(filteredChoices[i].choiceMark, filteredChoices[i].choiceText, filteredChoices[i].choiceMediaPath);
        if (filteredChoices[i].choiceMark > 0) countPositiveChoiceGrade++;
      };
      if (countPositiveChoiceGrade > 1) moreThanOneChoice = true;
      else moreThanOneChoice = false;
      const questionData = new Question(categoryID, filledName, filledText, moreThanOneChoice, questionMediaPath, QuestionChoices);
      apiServices.postQuestion(questionData)
      .then(res => {
        questionData.questionId = res.data;
        setQuizQuestions([...quizQuestions, questionData]);
        handleClose();
      })
      .catch(error => console.log(error));
  }

  useEffect(() => {
    setChoices([{ choiceText: "", choiceMark: 0, choiceMediaPath: null }, { choiceText: "", choiceMark: 0, choiceMediaPath: null }]);
    apiServices.getCategory()
    .then(res => {
      setCategories(res.data)
    })
    .catch(error => console.log(error));
  }, []);

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>Add a new question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Stack direction="horizontal" gap={2}>
            <NavDropdown disabled style={{ color: "blue", fontSize: "25px" }}>
            </NavDropdown>
            <Navbar.Text style={{ color: "red", fontSize: "25px" }}>
              General
            </Navbar.Text>
          </Stack>

          <div className='row justify-content-start'>
            <Col className='col-4' style={{ fontSize: '20px' }}>
              Category
            </Col>
            <Col style={{ marginLeft: '50px' }} className='col-6'>
              <Form.Select value={categoryID} onChange={handleChangeCategory} style={{ marginLeft: "20px", width: "300px" }}>
                {categories.map((category) => (
                  <option value={category.id}>{`${'\xa0'.repeat(category.level * 2)}`} {category.name}</option>
                ))}
              </Form.Select>
            </Col>
          </div>

          <br />
          <div className='row justify-content-start'>
            <Col className='col-4' style={{ fontSize: '20px' }}>
              Question name
            </Col>
            <Col style={{ marginLeft: '50px' }} className='col-6'>
              <Stack direction="horizontal" gap={2}>
                <img src={alert} width="13" height="13" alt="img" />
                <Form.Control
                  value={filledName}
                  onChange={handleChangeName}
                  type="text"
                  placeholder="Question name"
                />
              </Stack>
            </Col>
          </div>

          <br />
          <div className='row justify-content-start'>
            <Col className='col-4' style={{ fontSize: '20px' }}>
              Question text
            </Col>
            <Col style={{ marginLeft: '50px' }} className='col-6'>
              <Stack direction="horizontal" gap={2}>
                <img src={alert} width="13" height="13" style={{ marginBottom: "270px" }} alt="Img" />
                <Form.Control value={filledText} onChange={handleChangeText}
                  type="text"
                  placeholder="Question text"
                  as="textarea"
                  style={{height: '300px' }}
                />
              </Stack>
            </Col>
          </div>

          <br />
          <div className='row justify-content-start'>
            <Col className='col-4' style={{ fontSize: '20px' }}>
              Question media
            </Col>
            <Col style={{ marginLeft: '80px' }} className='col-6'>
              <Row>
                <Form.Control type="file" accept="image/*, video/*" onChange={e => {
                  reader.readAsDataURL(e.target.files[0]);
                  reader.onloadend = () => {
                    setQuestionMediaPath(reader.result);
                  }
                }}/>
              </Row>
              {
                questionMediaPath ? 
                <Row className="m-0 p-0 mt-2">
                  {
                    getMediaType(questionMediaPath) == "image" ?
                    <img style={{objectFit: 'fill', maxHeight: '200px', maxWidth: "300px"}} src={questionMediaPath} /> :
                    <video controls src={questionMediaPath} />
                  }
                </Row> :
                null
              }
            </Col>
          </div>
          <br />

          <br />
          <div className='row justify-content-start'>
            <Col className='col-4' style={{ fontSize: '20px' }}>
              Default mark
            </Col>
            <Col style={{ marginLeft: '50px' }} className='col-6'>
              <Stack direction="horizontal" gap={2}>
                <img src={alert} width="13" height="13" alt="Img" />
                <Form.Control type="text" style={{ width: "100px" }} defaultValue={1} />
              </Stack>
            </Col>
          </div>

          <br />
          {
            choices.map((choice, index) => (
              <Card className="d-flex" style={{ width: "550px", marginLeft: "45%", marginTop: "20px", backgroundColor: "#f0eeed"}}>
                <Card.Body>
                  <Form.Group as={Row}>
                    <Col xs={3}>
                      <Form.Label style={{ fontSize: "20px" }}>
                        Choice {index + 1}
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Control
                        onChange={event => handleUpdateChoices(index, 'choiceText', event.target.value)}
                        value={choice.choiceText}
                        as="textarea"
                        type="text"
                        style={{ height: "80px" }}
                      />
                    </Col>
                  </Form.Group>
                  <br />
                  <Form.Group as={Row}>
                    <Col xs={3}>
                      <Form.Label style={{ fontSize: "20px" }}>
                        Grade
                      </Form.Label>
                    </Col>
                    <Col>
                      <Form.Select
                        value={choice.choiceMark}
                        onChange={event => handleUpdateChoices(index, 'choiceMark', event.target.value)}
                        style={{width: "160px" }}
                      >
                        <option value={0}> None</option>
                        {choiceMarkList.map((choiceMark) => (
                          <option value={choiceMark}> {choiceMark * 100}%</option>
                        ))}
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  <br />
                  <Form.Group as={Row}>
                    <Col xs={3}>
                      <Form.Label style={{ fontSize: "20px" }}>Media</Form.Label>
                    </Col>
                    <Col>
                      <Row className="m-0 p-0">
                        <Form.Control type="file" accept="image/*, video/*" onChange={e => handleUpdateChoices(index, 'choiceMediaPath', e.target.files[0])}/>
                      </Row>
                      {choice.choiceMediaPath ? 
                        <Row className="m-0 p-0 mt-2">
                          {
                            getMediaType(choice.choiceMediaPath) === "image" ?
                            <img style={{objectFit: 'fill', maxHeight: '200px', maxWidth: "300px"}} src={choice.choiceMediaPath}/> :
                            <video controls src={choice.choiceMediaPath} />
                          }
                        </Row>
                      : null}
                    </Col>
                  </Form.Group>
                </Card.Body>
              </Card>
            ))
          }
          <Button
            onClick={() => {
              setChoices(choices => [...choices, { choiceText: "", choiceMark: 0, choiceMediaPath: null }, { choiceText: "", choiceMark: 0, choiceMediaPath: null  }, { choiceText: "", choiceMark: 0, choiceMediaPath: null }])
            }}
            variant="primary"
            style={{ marginLeft: "45%", marginTop: "50px" }}
          >
            BLANKS FOR 3 MORE CHOICES
          </Button>
          <ToastContainer hideProgressBar autoClose={3000}></ToastContainer>
          <Button onClick={handleSave} variant="danger" style={{ marginLeft: "45%", marginTop: "30px" }}>SAVE</Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}
