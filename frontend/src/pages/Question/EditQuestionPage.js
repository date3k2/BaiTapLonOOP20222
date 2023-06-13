import React, { useState, useEffect } from "react";
import { Button, Container, NavDropdown, Stack } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import alert from "../../icons/alert.png";
import apiServices from '../../services/apiServices';

export default function EditQuestionPage() {
  let gradeList =
    [100, 90, 83.33333, 80, 75, 70, 66.66667, 60, 50, 40, 33.33333,
      30, 25, 20, 16.66667, 14.28571, 12.5, 11.11111, 10, 5];
  let tmp = [];
  for (let i = 0; i < gradeList.length; ++i) {
    tmp[i] = -gradeList[gradeList.length - i - 1];
  }
  gradeList = gradeList.concat(tmp);

  const [isEdit, setIsEdit] = useState(false);
  const [filledName, setFilledName] = useState("");
  const [filledText, setFilledText] = useState("");
  const [choices, setChoices] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('questionID');
    if (paramValue != null) {
      setIsEdit(true);
    }
    else {
      setChoices([{ content: "", grade: 0 }, { content: "", grade: 0 }]);
    }
    // console.log(paramValue);
    apiServices.getQuestion(paramValue)
      .then(res => {
        setFilledName(res.data.questionName)
        setFilledText(res.data.questionText)
        setChoices(res.data.choice)
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
  
  const handleUpdateChoices = (index, key, newValue) => {
    setChoices(prevChoices => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index][key] = newValue;
      return updatedChoices;
    });
  }

  const handleSaveQuestion = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.content !== "");
    const item = {filledName, filledText, filteredChoices};
    const params = new URLSearchParams(window.location.search);
    const paramValue = params.get('questionID');
    apiServices.putQuestion(item, paramValue)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
  };
  const handleAddQuestion = (event) => {
    event.preventDefault();
    const filteredChoices = choices.filter(choice => choice.content !== "");
    const item = {filledName, filledText, filteredChoices};
    console.log(item);
    // apiServices.postQuestion(item)
    //   .then(res => {
    //     console.log(res.data);
    //   })
    //   .catch(error => console.log(error));
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
            <Form.Select style={{ marginLeft: "20px", width: "350px" }}>
              <option hidden>Default</option>
              {categories.map((category) => (
                <option value={category}> {category.name}</option>
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
                      onChange={event => handleUpdateChoices(index, 'content', event.target.value)}
                      value={choice.content}
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
                      value={choice.grade}
                      onChange={event => handleUpdateChoices(index, 'grade', event.target.value)}
                      style={{ marginRight: "250px", width: "160px" }}
                    >
                      <option hidden > None</option>
                      {gradeList.map((grade) => (
                        <option value={grade}> {grade}%</option>
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
            setChoices(choices => [...choices, { content: "", grade: 0 }, { content: "", grade: 0 }, { content: "", grade: 0 }])
          }
          }
          variant="primary"
          style={{ marginLeft: "550px", marginTop: "50px" }}
        >
          BLANKS FOR 3 MORE CHOICES
        </Button>
        <br />
        <Button
          onClick={handleSaveQuestion}
          variant="primary"
          style={{ marginLeft: "500px", marginTop: "60px" }}
          href={window.location.href}
        >
          SAVE CHANGE AND CONTINUE EDITING
        </Button>
        <br />
        <Button
          onClick={handleAddQuestion}
          variant="danger"
          style={{ marginLeft: "500px", marginTop: "30px" }}
          //href="/"
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