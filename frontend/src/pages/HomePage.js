import React, { useEffect, useState } from 'react'
import { Container, Stack } from 'react-bootstrap'
import exam from '../icons/exam.png'
import apiServices from '../services/apiServices'
import Loading from '../component/Loading'

export default function HomePage() {
  const [QuizList, setQuizList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    apiServices.getAllQuiz()
      .then(res => {
        setQuizList(res.data)
        setIsLoading(false)
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div>
      {
        isLoading ? <Loading />
          :
          <Container className='border p-0'>
            {QuizList.map(quiz =>
              <Stack className='p-3' direction='horizontal'>
                <img src={exam} style={{ height: "20px" }} className='me-2' />
                <a href={`/${quiz.quizName}+${quiz.quizId}`} style={{ textDecoration: 'none', color: 'black' }}>{quiz.quizName}</a>
              </Stack>
            )}
          </Container>
      }
    </div>
  )
}
