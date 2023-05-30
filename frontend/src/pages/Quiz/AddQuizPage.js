import React, { useState } from 'react'
import { Button, Container, FormCheck, FormControl, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import alert from '../../icons/alert.png'
import exam from '../../icons/exam.png'
import questionmark from '../../icons/questionmark.png'
import calendar from '../../icons/calendar.png'


function TimeQuizz() {
  let listDate = [];
  for (let i = 1; i <= 31; ++i) listDate[i] = i;
  let listMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let listYear = [];
  for (let i = 0; i <= 100; ++i) listYear[i] = i + 2023;
  let listHour = [];
  for (let i = 1; i <= 24; ++i) listHour[i] = i;
  let listMinute = [];
  for (let i = 0; i <= 60; ++i) listMinute[i] = i;
  return (
    <>
      <Form.Select style={{ width: '70px' }}>
        {listDate.map((date, index) => (
          <option value={index + 1}> {date}</option>
        ))}
      </Form.Select >

      <Form.Select style={{ width: '130px' }}>
        {listMonth.map((month, index) => (
          <option value={index + 1}> {month}</option>
        ))}
      </Form.Select>

      <Form.Select style={{ width: '100px' }}>
        {listYear.map((year, index) => (
          <option value={index + 1}> {year}</option>
        ))}
      </Form.Select>

      <Form.Select style={{ width: '70px' }}>
        {listHour.map((hour, index) => (
          <option value={index + 1}> {hour}</option>
        ))}
      </Form.Select>

      <Form.Select style={{ width: '70px' }}>
        {listMinute.map((minute, index) => (
          <option value={index + 1}> {minute}</option>
        ))}
      </Form.Select>

      <img src={calendar} width='15px' height='15px' />

      <Form.Check
        type='checkbox'
        label='Enable'
      />
    </>
  );
}

export default function AddQuizPage() {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <Container className='border p-2'>
      <Stack direction="horizontal" gap={2}>
        <img src={exam} width='15px' height='17px' style={{ marginBottom: '10px' }} />
        <p
          style={{ color: 'red', fontSize: '30px' }}>
          Adding a new Quizz
        </p>
        <img src={questionmark} width='15px' height='15px' style={{ marginBottom: '10px' }} />
      </Stack>

      <div style={{ padding: '25px' }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text
            style={{ color: 'red', fontSize: '25px' }}>
            General
          </Navbar.Text>
        </Stack>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Name
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' />
              <Form.Control type='text' style={{ width: '500px' }} />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Description
          </Form.Label>
          <Col style={{ marginLeft: '42px' }} >
            <Form.Control type="text" as="textarea" style={{ height: '300px' }} />

            <Stack direction="horizontal" gap={2}>
              <Form.Check
                type='checkbox'
                label='Display description on course page'
              />
              <img src={questionmark} width='13px' height='13px' />
            </Stack>
          </Col>
        </Form.Group>

        <hr />
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text
            style={{ color: 'red', fontSize: '25px' }}>
            Timing
          </Navbar.Text>
        </Stack>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Open the quizz
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <TimeQuizz />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Close the quizz
          </Form.Label>
          <Col style={{ marginLeft: '42px' }}>
            <Stack direction="horizontal" gap={2}>
              <TimeQuizz />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Time limit
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              {
                isChecked ? <FormControl type='text' style={{ width: '100px' }} />
                  : <FormControl disabled type='text' style={{ width: '100px' }} />
              }
              <Form.Select style={{ width: '115px' }}>
                <option value={1}>
                  minutes
                </option>
                <option value={2}>
                  hours
                </option>
              </Form.Select>
              <Form.Check
                type='checkbox'
                label='Enable'
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            When time expires
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select style={{ width: '350px' }}>
                <option>Opens attempts are submitted automatic</option>
              </Form.Select>
            </Stack>
          </Col>
        </Form.Group>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Button variant="danger">Create </Button>
        <Button variant="primary" style={{ marginLeft: '10px' }}>Cancel </Button>
      </div>
    </Container >
  )
}
