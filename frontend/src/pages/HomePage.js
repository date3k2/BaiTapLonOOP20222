import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'

export default function HomePage() {

  const URL = "";
  const [QuizList, setQuizList] = useState([]);

  // axios.get(URL)
  // .then(res => {
  //   setQuizList(res.data)
  // })
  // .catch(err => {
  //   console.log(err)
  // })

  return (
    <Container className='border p-3'>
      {QuizList.map(quiz => <a href='#'>{quiz.quizName}</a>)}
    </Container>
  )
}
