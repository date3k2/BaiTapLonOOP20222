import React, { useEffect, useState } from 'react'
import { Form, Modal, Nav, Row, Col, Container, Button, Pagination } from 'react-bootstrap'
import Category from '../../../component/Category';
import apiServices from '../../../services/apiServices';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

export default function ANewQuestionModal({setOption, quizQuestions, setQuizQuestions}) {

  const MAX_QUESTIONS_PER_PAGE = 10;
  const [doesShowSub, setDoesShowSub] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState();
  const [optionsList, setOptionsList] = useState([]);
  const [numberRandomQuestion, setNumberRandomQuestion] = useState(1);
  const [chosenPage, setChosenPage] = useState(1);

  const data = useParams();

  useEffect(() => {
    apiServices.getQuestions(category, doesShowSub)
    .then(res => {
      setQuestions(res.data)
    })
    .catch(err => console.log(err))
  }, [doesShowSub]);

  const handleCategory = e => {
    setCategory(e.target.value);
    let category = e.target.value;
    apiServices.getQuestions(category, doesShowSub)
    .then(res => {
      setQuestions(res.data);
      const arr = Array.from(
        {length: res.data.length},
        (_, index) => index + 1
      );
      setOptionsList(arr);
    })
    .catch(err => console.log(err))
  }

  const handleShowSub = e => {
    setDoesShowSub(doesShowSub => !doesShowSub);
  };

  const handleSubmit = () => {
    let randomQuestions = [];
    while(randomQuestions.length < numberRandomQuestion){
      let questionId = Math.floor(Math.random() * questions.length);
      if(randomQuestions.indexOf(questions[questionId]) == -1) randomQuestions.push(questions[questionId]);
    }
    setQuizQuestions(quizQuestions => [...quizQuestions, ...randomQuestions]);
  }

  const handleClose = () => {
    setOption(-1);
  }

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>Add a random question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Nav variant='tabs' activeKey={0}>
          <Nav.Item>
            <Nav.Link active>Existing category</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>New category</Nav.Link>
          </Nav.Item>
        </Nav>
        <Category handleCategory={handleCategory} />
        <Form.Check type='checkbox' label='Also show question from sub categories' onChange={handleShowSub}/>
        <Row direction='horizontal' className='my-3'>
          <Col xs="3">
            <p>Number of random question: </p>
          </Col>
          <Col xs="1">
            <Form.Select size='sm' onChange={e => setNumberRandomQuestion(e.target.value)}>
              {
                optionsList.map(item => <option value={item}>{item}</option>)
              }
            </Form.Select>
          </Col>
        </Row>
        <p className='m-0'>Question matching this filter:</p>
        {
          questions.length > 0 && 
          <Pagination>
            <Pagination.Prev onClick={() => setChosenPage(chosenPage => Math.max(chosenPage - 1, 1))} />
            {
              Array.from(
                {length: Math.ceil(questions.length / MAX_QUESTIONS_PER_PAGE)},
                (_, index) => index + 1
              ).map((item, index) => <Pagination.Item key={index} active={item === chosenPage} onClick={() => setChosenPage(item)}>{item}</Pagination.Item>)
            }
            <Pagination.Next onClick={() => setChosenPage(chosenPage => Math.min(chosenPage + 1, Math.ceil(questions.length / MAX_QUESTIONS_PER_PAGE)))} />
          </Pagination>
        }
        {
          questions.length > 0 && questions.slice((chosenPage - 1) * MAX_QUESTIONS_PER_PAGE, chosenPage * MAX_QUESTIONS_PER_PAGE).map(item => 
            <p className='border p-2 m-0'>{item.questionName + item.questionText}</p>
          )
        }
        <Button onClick={handleSubmit} className='mt-2'>ADD RANDOM QUESTION TO THE QUIZ</Button>
      </Modal.Body>
      <ToastContainer hideProgressBar autoClose={3000} />
    </Modal>
  )
}
