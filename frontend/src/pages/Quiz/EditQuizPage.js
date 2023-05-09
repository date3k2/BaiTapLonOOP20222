import React from "react";
import { Container, Col, Stack, Button, Dropdown } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import { ImPlus } from "react-icons/im";
import questionmark from "../../icons/questionmark.png";
import { useState } from "react";

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

    >
      <Col className="d-flex justify-content-center" xs={3}>
        <ImPlus size={15} color="#0081C9" />
      </Col>
      <Col> {props.name} </Col>
    </Stack>
  );
}
export default function EditQuizPage() {
  const [isChecked, setIsChecked] = useState(false);
  const handleOnClick = () => {
    setIsChecked(!isChecked);
  };

  const items = ["a new question", "from question bank", "a random question"];

  return (
    <Container className="border p-2">
      <Stack direction="horizontal" gap={1}>
        <div style={{ color: "red", fontSize: "35px" }}>
          Editing quiz: Thi giữa kì 2 môn Công nghệ
        </div>
        <img src={questionmark} style={{ width: "15px", height: "15px" }} />
      </Stack>

      <Stack className="my-1" direction="horizontal">
        <Col style={{ fontSize: "16px" }}>Question: 0 | This quiz is open</Col>
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
          Total of marks: {1}
        </Col>
      </Stack>

      <Container className="mt-3" style={{ background: "#F2EFEA" }}>
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
              <div style={{ margin: "5px" }}>Add</div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Container className="d-flex" style={{ width: "250px" }}>
                <Stack>
                  {items.map((item, index) => (
                    <HandleHighlight name={item} id={index}/>
                  ))}
                </Stack>
              </Container>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>

      <div className="col-md-1 mx-auto" style={{ marginTop: "250px" }}>
        <select style={{ width: "150px" }}>
          <option value="" selected="">
            Jump to...
          </option>
        </select>
      </div>
    </Container>
  );
}
