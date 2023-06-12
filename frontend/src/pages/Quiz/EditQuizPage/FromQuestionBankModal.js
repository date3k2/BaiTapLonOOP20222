import React, { useEffect, useState } from 'react'
import { Modal, Form, Table, Button } from 'react-bootstrap'
import apiServices from '../../../services/apiServices';
import Category from '../../../component/Category';
import { BsZoomIn } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

function Question({question, chooseQuestion, setChooseQuestion}){

  const handleChooseQuestion = () => {
    if(chooseQuestion.includes(question.id)){
      setChooseQuestion(chooseQuestion => chooseQuestion.filter(item => item !== question.id));
    } else {
      setChooseQuestion(chooseQuestion => [...chooseQuestion, question.id]);
    }
  }

  return(
    <tr>
      <td width='2%'>
        {/* {chooseQuestion.length > 0 && chooseQuestion.includes(question.id) ? <Form.Check type='checkbox' checked onChange={handleChooseQuestion}/> : <Form.Check type='checkbox' onChange={handleChooseQuestion}/>} */}
        <Form.Check type='checkbox' checked={chooseQuestion.includes(question.id)} onChange={handleChooseQuestion}/>
      </td>
      <td>{question.questionName + question.questionText}</td>
      <td width='2%'><BsZoomIn className="ms-auto me-3" /></td>
    </tr>
  );
}

export default function ANewQuestionModal({setOption}) {
  const [doesShowSub, setDoesShowSub] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [chooseQuestion, setChooseQuestion] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  let data = useParams();

  const handleSubmit = () => {
    apiServices.postQuizQuestion(data.quizName, chooseQuestion)
    .then(res => toast.success(res.data))
    .catch(err => console.log(err));
  }

  const handleChooseAll = () => {
    if(isCheckedAll){
      setChooseQuestion([]);
      setIsCheckedAll(false);
    } else {
      setChooseQuestion([]);
      questions.map(question => setChooseQuestion(chooseQuestion => [...chooseQuestion, question.id]));
      setIsCheckedAll(true);
    }
  }

  const handleShowSub = () => {
    setDoesShowSub(doesShowSub => !doesShowSub);
  };

  const handleCategory = e => {
    setChooseQuestion([]);
    setIsCheckedAll(false);
    const category = e.target.value;
    apiServices.getQuestions(category, doesShowSub)
    .then(res => {
      setQuestions(res.data)
    })
    .catch(err => console.log(err))
  }

  const handleClose = () => {
    setOption(-1);
  }

  return (
    <Modal show={true} onHide={handleClose} backdrop="static" keyboard={false} size='xl'>
      <Modal.Header closeButton>
        <Modal.Title style={{color: 'red'}}>Add from question bank at the end</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Category handleCategory={handleCategory} />
        <p className='m-0' style={{color: 'skyblue'}}>Search options</p>
        <Form.Check type='checkbox' label='Also show question from subcategories' onChange={handleShowSub}/>
        <Form.Check type='checkbox' label='Also show old question'/>
        {
          questions.length > 0 && 
          <Table striped>
            <thead>
              <tr>
                <th><Form.Check checked={isCheckedAll} onChange={handleChooseAll} type='checkbox'/></th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {
                questions.map(question => <Question question={question} chooseQuestion={chooseQuestion} setChooseQuestion={setChooseQuestion} />)
              }
            </tbody>
          </Table>
        }
      <Button onClick={handleSubmit}>ADD SELECTED QUESTION TO THE QUIZ</Button>
      </Modal.Body>
      <ToastContainer hideProgressBar autoClose={3000} />
    </Modal>
  )
}
