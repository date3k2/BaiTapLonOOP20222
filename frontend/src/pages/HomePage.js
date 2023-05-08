import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import axios from 'axios'
import exam from '../icons/exam.png'

export default function HomePage() {

  const URL = "https://9333b960-135e-48a2-9e3d-de1f194dd3d3.mock.pstmn.io";
  const [QuizList, setQuizList] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/quiz`)
    .then(res => {
      setQuizList(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Container className='border p-0'>
      {QuizList.map(quiz => 
        <Stack className='p-3' direction='horizontal'>
          <img src={exam} style={{height: "20px"}} className='me-2'/>
          <a href={`/${quiz.quizName}`} style={{textDecoration: 'none', color: 'black'}}>{quiz.quizName}</a>
        </Stack>
      )}
    </Container>
  )
}
