import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'

export default function HomePage() {

  const URL = "https://9333b960-135e-48a2-9e3d-de1f194dd3d3.mock.pstmn.io";
  const [QuizList, setQuizList] = useState([]);

  useEffect(() => {
    axios.get(`${URL}/question`)
    .then(res => {
      setQuizList(res.data)
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <Container className='border p-3'>
      {QuizList.map(quiz => 
        <div className='mb-3'>
          <a href='#' style={{textDecoration: 'none', color: 'black'}}>{quiz.quizName}</a>
        </div>
      )}
    </Container>
  )
}
