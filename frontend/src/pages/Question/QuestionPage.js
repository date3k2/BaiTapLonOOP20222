import React, { useEffect, useState } from 'react'
import OptionsPanel from '../../component/OptionsPanel'
import { Container, Form, Stack, Button, Table } from 'react-bootstrap'
import apiServices from '../../services/apiServices';
import Category from '../../component/Category';
import Loading from '../../component/Loading';

function Question({ question }) {
  return (
    <tr>
      <td width="2%"><input type='checkbox' /></td>
      <td>{question.questionCode ? question.questionCode : null} {question.questionText}</td>
      <td width="5%"><a href={`/question/edit?questionID=${question.questionId}`}>Edit</a></td>
    </tr>
  )
}

export default function EditQuestionPage() {
  const [doesShowSub, setDoesShowSub] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSub, setIsLoadingSub] = useState(false);
  const handleShowSub = e => {
    setDoesShowSub(doesShowSub => !doesShowSub);
  };

  useEffect(() => {
    setIsLoading(true)
    apiServices.getQuestions(category, doesShowSub)
      .then(res => {
        setQuestions(res.data)
        setIsLoading(false);
      })  
      .catch(err => console.log(err))
  }, [doesShowSub]);

  const handleCategory = e => {
    const category = e.target.value;
    setCategory(category);
    setIsLoading(true);
    setIsLoadingSub(true);
    apiServices.getQuestions(category, doesShowSub)
      .then(res => {
        setQuestions(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Container className='border p-2'>
        <OptionsPanel activeTab={0} />
        <p style={{ color: 'red', fontSize: '35px' }}>Question bank</p>
        <Category handleCategory={handleCategory} />
        <p>The default category for questions shared in context</p>
        <Form.Check type='checkbox' label='Also show question from sub categories' onChange={handleShowSub} />
        <Form.Check type='checkbox' label='Also show old question' />
        <Button href='/question/edit'>Create a new question</Button>
        {
          isLoadingSub && isLoading ? <Loading /> :
          <Container className='m-0 p-0'>
            {
              questions.length > 0 && 
              <Table striped>
                <thead>
                  <tr>
                    <th></th>
                    <th>Question</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    questions.map(question => <Question question={question} />)
                  }
                </tbody>
              </Table>
            }
          </Container>
        }
      </Container>
    </div>
  )
}
