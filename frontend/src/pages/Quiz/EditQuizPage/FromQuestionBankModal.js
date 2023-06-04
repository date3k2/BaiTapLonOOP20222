import React, { useEffect, useState } from 'react'
import { Modal, Form, Table, Button } from 'react-bootstrap'
import apiServices from '../../../services/apiServices';
import Category from '../../../component/Category';
import { BsZoomIn } from "react-icons/bs";

function Question({question}){
  return(
    <tr>
      <td width='2%'><Form.Check type='checkbox'/></td>
      <td>{question.questionName + question.questionText}</td>
      <td width='2%'><BsZoomIn className="ms-auto me-3" /></td>
    </tr>
  );
}

export default function ANewQuestionModal({setOption}) {
  const [doesShowSub, setDoesShowSub] = useState(true);
  const [questions, setQuestions] = useState([]);

  const handleShowSub = e => {
    setDoesShowSub(doesShowSub => !doesShowSub);
    console.log(doesShowSub);
  };

  const handleCategory = e => {
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
                <th><Form.Check type='checkbox'/></th>
                <th>Question</th>
              </tr>
            </thead>
            <tbody>
              {
                questions.map(question => <Question question={question} />)
              }
            </tbody>
          </Table>
        }
      <Button>ADD SELECTED QUESTION TO QUIZ</Button>
      </Modal.Body>
    </Modal>
  )
}
