import React, { useState } from 'react'
import { Button, Container, FormControl, NavDropdown, Stack } from 'react-bootstrap'
import { Col, Form, Navbar } from 'react-bootstrap';
import alert from '../../icons/alert.png'
import exam from '../../icons/exam.png'
import { toast, ToastContainer } from 'react-toastify';
import questionmark from '../../icons/questionmark.png'
import calendar from '../../icons/calendar.png'
import apiServices from '../../services/apiServices';
import { Quiz } from '../../models/Quiz'
import { useNavigate } from 'react-router-dom'
import LoadingButton from '../../component/LoadingButton';

export default function AddQuizPage() {
  const [quizName, setQuizName] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [descriptionShow, setDescriptionShow] = useState(false);
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [selected, setSelected] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleDescriptionShowChange = (event) => {
    setDescriptionShow(event.target.checked);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value)
  };
  const handleTimeLimit = (event) => {
    const value = event.target.value
    setTimeLimit(value);
  };
  const handleQuizNameChange = (event) => {
    setQuizName(event.target.value)
  };
  const handleSelectedChange = (event) => {
    setSelected(event.target.value)
  };

  const handleAddQuiz = (event) => {
    event.preventDefault();
    if (quizName == "") {
      toast.warning("Quiz name need to be completed");
      return;
    }
    let timeLimitInSecond = timeLimit;
    if (timeLimit == "" || isChecked == false) timeLimitInSecond = null;
    else if (isNaN(timeLimit)) {
      toast.warning("The time limit must be a number");
      return;
    }
    else if (timeLimit <= 0) {
      toast.warning("The time limit must be positive");
      return;
    }
    else {
      if (selected == 0) timeLimitInSecond *= 60;
      else timeLimitInSecond *= 3600;
    }
    const quizData = new Quiz(quizName, description, timeLimitInSecond, descriptionShow, false);
    console.log(quizData);
    setIsLoading(false);
    apiServices.postQuiz(quizData)
      .then(res => {
        console.log(res.data);
        navigate('/')
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className='border p-2'>
      <Stack direction="horizontal" gap={2}>
        <img src={exam} width='15px' height='17px' style={{ marginBottom: '10px' }} />
        <p style={{ color: 'red', fontSize: '30px' }}>
          Adding a new Quiz
        </p>
        <img src={questionmark} width='15px' height='15px' style={{ marginBottom: '10px' }} />
      </Stack>

      <div style={{ padding: '25px' }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown disabled style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text style={{ color: 'red', fontSize: '25px' }}>
            General
          </Navbar.Text>
        </Stack>

        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Name
          </Col>
          <Col style={{ marginLeft: '50px' }} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' />
              <Form.Control onChange={handleQuizNameChange} type='text' style={{ width: '400px' }} />
            </Stack>
          </Col>
        </div>

        <br />
        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Description
          </Col>
          <Col style={{ marginLeft: '71px' }} className='col-4'>
            <div>
              <Form.Control onChange={handleDescriptionChange} type="text" as="textarea" style={{ width: '600px', height: '300px' }} />
              <Stack direction="horizontal" gap={2}>
                <Form.Check
                  type='checkbox'
                  label='Display description on course page'
                  checked={descriptionShow}
                  onChange={handleDescriptionShowChange} />
                <img src={questionmark} width='13px' height='13px' />
              </Stack>
            </div>
          </Col>
        </div>

        <br /> <hr />
        <Stack direction="horizontal" gap={2}>
          <NavDropdown style={{ color: 'blue', fontSize: '25px' }} disabled>
          </NavDropdown>
          <Navbar.Text style={{ color: 'red', fontSize: '25px' }}>
            Timing
          </Navbar.Text>
        </Stack>

        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Open the quizz
          </Col>
          <Col style={{ marginLeft: '50px' }} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <TimeQuizz />
            </Stack>
          </Col>
        </div>

        <div style={{ marginTop: '15px' }} className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Close the quizz
          </Col>
          <Col style={{ marginLeft: '71px' }} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <TimeQuizz />
            </Stack>
          </Col>
        </div>

        <div style={{ marginTop: '15px' }} className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Time limit
          </Col>
          <Col style={{ marginLeft: '50px' }} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <FormControl disabled={isChecked ? null : 'disabled'} value={timeLimit} onChange={handleTimeLimit} type='text' style={{ width: '100px' }} />
              <Form.Select disabled={isChecked ? null : 'disabled'} value={selected} onChange={handleSelectedChange} style={{ width: '115px' }}>
                <option value={0}> minutes </option>
                <option value={1}> hours </option>
              </Form.Select>
              <Form.Check type='checkbox' label='Enable' checked={isChecked} onChange={handleCheckboxChange} />
            </Stack>
          </Col>
        </div>

        <div style={{ marginTop: '15px' }} className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            When time expires
          </Col>
          <Col style={{ marginLeft: '50px' }} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select style={{ width: '340px' }}>
                <option>Opens attempts are submitted automatic</option>
              </Form.Select>
            </Stack>
          </Col>
        </div>
      </div>

      <div style={{ marginTop: '30px', display: "flex", justifyContent: 'center' }}>
        {isLoading ? <Button onClick={handleAddQuiz} variant="danger"> Create </Button>
          : <LoadingButton color={'danger'} />}
        <ToastContainer hideProgressBar autoClose={3000}></ToastContainer>
        <Button variant="primary" style={{ marginLeft: '20px' }} href='/'> Cancel </Button>
      </div>
      <div style={{ marginTop: '30px', display: "flex", justifyContent: 'center' }}>
        <Stack direction="horizontal" gap={1}>
          <p style={{ fontSize: '18px' }}> There are required fields in this form marked</p>
          <img src={alert} width='13px' height='13px' style={{ marginBottom: '14px' }} />
        </Stack>
      </div>
    </Container >
  )
}

function TimeQuizz() {
  let listDate = [];
  for (let i = 1; i <= 31; ++i) listDate[i] = i;
  let listMonth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let listYear = [];
  for (let i = 0; i <= 50; ++i) listYear[i] = i + 2023;
  let listHour = [];
  for (let i = 1; i <= 24; ++i) listHour[i] = i;
  let listMinute = [];
  for (let i = 0; i <= 60; ++i) listMinute[i] = i;
  let checkMonth = false;

  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [selectedYear, setSelectedYear] = useState(2023);
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState(0);

  const handleDaySelect = (event) => {
    const value = event.target.value;
    setSelectedDay(value);
    if (value === 31) {
      if (selectedMonth === 'April' || selectedMonth === 'June' || selectedMonth === 'September' || selectedMonth === 'November') {
        setSelectedDay(30);
      }
      if (selectedMonth === 'February' && selectedYear % 4 === 0) setSelectedDay(29);
      if (selectedMonth === 'February' && selectedYear % 4 !== 0) setSelectedDay(28);
    }
    if (value === 30) {
      if (selectedMonth === 'February' && selectedYear % 4 === 0) setSelectedDay(29);
      if (selectedMonth === 'February' && selectedYear % 4 !== 0) setSelectedDay(28);
    }
    if (value === 29) {
      if (selectedMonth === 'February' && selectedYear % 4 !== 0) setSelectedDay(28);
    }
  };

  const handleMonthSelect = (event) => {
    const value = event.target.value;
    if (value === 'April' || value === 'June' || value === 'September' || value === 'November') checkMonth = true;
    else checkMonth = false;
    setSelectedMonth(value);
    if (selectedDay === 31 && checkMonth === true) {
      setSelectedDay(30);
    }
    if (value === 'February') {
      if (selectedYear % 4 !== 0) {
        if (selectedDay === 31 || selectedDay === 30 || selectedDay === 29) setSelectedDay(28);
      }
      else {
        if (selectedDay === 31 || selectedDay === 30) setSelectedDay(29);
      }
    }
  };

  const handleYearSelect = (event) => {
    const value = event.target.value;
    setSelectedYear(value);
    if (value % 4 !== 0) {
      if (selectedMonth === 'February' && selectedDay === 29) {
        setSelectedDay(28);
      }
    }
  };

  const handleHourSelect = (event) => {
    setSelectedHour(event.target.value);
  };
  const handleMinuteSelect = (event) => {
    setSelectedMinute(event.target.value);
  };

  return (
    <>
      <Form.Select value={selectedDay} onChange={handleDaySelect} style={{ width: '70px' }}>
        {listDate.map((date) => (
          <option value={date}> {date}</option>
        ))}
      </Form.Select >

      <Form.Select value={selectedMonth} onChange={handleMonthSelect} style={{ width: '130px' }}>
        {listMonth.map((month) => (
          <option value={month}> {month}</option>
        ))}
      </Form.Select>

      <Form.Select value={selectedYear} onChange={handleYearSelect} style={{ width: '100px' }}>
        {listYear.map((year) => (
          <option value={year}> {year}</option>
        ))}
      </Form.Select>

      <Form.Select value={selectedHour} onChange={handleHourSelect} style={{ width: '70px' }}>
        {listHour.map((hour) => (
          <option value={hour}> {hour}</option>
        ))}
      </Form.Select>

      <Form.Select value={selectedMinute} onChange={handleMinuteSelect} style={{ width: '70px' }}>
        {listMinute.map((minute) => (
          <option value={minute}> {minute}</option>
        ))}
      </Form.Select>

      <img src={calendar} width='15px' height='15px' />
      <Form.Check type='checkbox' label='Enable' />
    </>
  );
}