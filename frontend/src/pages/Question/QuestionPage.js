import React, { useEffect, useState } from 'react'
import OptionsPanel from '../../component/OptionsPanel'
import { Container, Form, Stack, Button, Table } from 'react-bootstrap'
import axios from 'axios'

const URL = "https://9333b960-135e-48a2-9e3d-de1f194dd3d3.mock.pstmn.io";

function Question({question}) {
  console.log(question)
  return (
    <tr>
      <td width="2%"><input type='checkbox' /></td>
      <td>{question.questionName + question.questionText}</td>
      <td width="5%"><a href='#'>Edit</a></td>
    </tr>
  )
}

export default function EditQuestionPage() {
  const [categories, setCategories] = useState([]);
  const [doesShowSub, setDoesShowSub] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/category`)
    .then(res => {
      // console.log(res.data)
      setCategories(res.data);
    })
    .catch(err => console.log(err));
  }, [])

  const handleShowSub = e => {
    setDoesShowSub(doesShowSub => !doesShowSub);
    console.log(doesShowSub);
  };

  const handleCategory = e => {
    const category = e.target.value;
    axios.get(`${URL}/question?category=${category}&doesShowSub=${doesShowSub}`)
    .then(res => {
      setQuestions(res.data)
    })
    .catch(err => console.log(err))
  }

  return (
    <div>
      <OptionsPanel activeTab={0} />
      <Container className='border p-2'>
        <p style={{color: 'red', fontSize: '35px'}}>Question bank</p>
        <Stack direction='horizontal'>
          <p className='me-2 mt-2'>Select a category: </p>
          <Form.Select style={{width: "250px"}} defaultValue='-1' onChange={handleCategory}>
            <option value='-1' disabled hidden>Default</option>
            {
              categories.map((item, index) => {
                let space = `${'\xa0'.repeat(item.level)}`;
                return <option key={index} value={item.name}>{space} {item.name}</option>
              })
            } 
          </Form.Select>
        </Stack>
        <p>The default category for questions shared in context</p>
        <Form.Check type='checkbox' label='Also show question from sub categories' onChange={handleShowSub}/>
        <Form.Check type='checkbox' label='Also show old question'/>
        <Button>Create a new question</Button>
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
    </div>
  )
}
