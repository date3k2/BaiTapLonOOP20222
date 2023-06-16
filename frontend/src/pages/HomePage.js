import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import exam from '../icons/exam.png'
import apiServices from '../services/apiServices'

export default function HomePage() {
  const [QuizList, setQuizList] = useState([]);

  useEffect(() => {
    apiServices.getAllQuiz()
    .then(res => setQuizList(res.data))
    .catch(err => console.log(err));
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
