import React, { memo, useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import apiServices from '../services/apiServices';
import { useLocation } from 'react-router-dom';
import Countdown from 'react-countdown';

function ExamQuestion({getMap, index, question, answer, setAnswer}){

  const handleChooseChoice = (choice) => {
    if(answer.get(question.questionId).includes(choice)){
      setAnswer(answer => new Map(answer.set(question.questionId, answer.get(question.questionId).filter(item => item != choice))));
    }
    else{ 
      let choices = answer.get(question.questionId);
      choices.push(choice);
      setAnswer(answer => new Map(answer.set(question.questionId, choices)));
    }
  }

  return(
    <Container className='mb-4' ref={(node) => {
      const map = getMap();
      if (node) {
        map.set(question.questionId, node);
      } else {
        map.delete(question.questionId);
      }
    }}>
      <Row>
        <Col className='border me-3 p-1' xs={2} style={{backgroundColor: '#e8ebeb'}}>
          <p className='m-0' style={{color: 'red'}}>Question <span style={{fontSize: '22px', fontWeight: 'bold'}}>{index + 1}</span></p>
          {answer && answer.get(question.questionId).length ? "Answered" : "Not yet answered"}
          <p className='m-0'>Marked out of 1.00</p>
          <p className='m-0'>Flag question</p>
        </Col>
        <Col className='p-2' style={{backgroundColor: '#dcf5f5'}}>
          <p>{question.questionName}</p>
          {question.questionChoices.map((choice, index) => 
            <Form.Check key={choice.choiceId} type={question.isMultipleChoice ? 'checkbox' : 'radio'} label={String.fromCharCode(index + 65) + ". " + choice.choiceText} name={question.questionId} onChange={() => handleChooseChoice(choice)}/>
          )}
        </Col>
      </Row>
    </Container>
  );
}

function QuestionSelectBox({question, index, handleClick, answer}){
  return(
    <div className='border flex-column m-1 p-0' style={{width: '30px', cursor: 'pointer', height: '40px'}} onClick={() => handleClick(question.questionId)}>
      <div className='d-flex justify-content-center' style={{height: '25px'}}>{index + 1}</div>
      {
        answer.get(question.questionId).length ? 
        <div className='m-0' style={{width: '30px', backgroundColor: 'gray', height: '15px'}}></div>
        : null
      }
    </div>
  );
}

function CountdownTimer({hours, minutes, seconds}){
  return <span className='border border-2 border-danger p-1 bg-white my-2'>Time left: {hours} : {minutes} : {seconds}</span>
}

const Timer = memo(function Timer({quizData}){
  return <Container className='d-flex flex-row-reverse sticky-top'>
  {quizData ? <Countdown date={Date.now() + quizData.timeLimitInSeconds * 1000} renderer={CountdownTimer} /> : null}
  </Container>;
});

export default function ExamPage() {

  const [answer, setAnswer] = useState(new Map());
  const ref = useRef(null);

  const path = useLocation();
  const pathArr = path.pathname.split('/')[1].split('+');
  const quizId = pathArr[pathArr.length - 1];
  const [quizData, setQuizData] = useState();

  function getMap() {
    if (!ref.current) {
      ref.current = new Map();
    }
    return ref.current;
  }

  const handleScrollToQuestion = (questionId) => {
    const map = getMap();
    const node = map.get(questionId);
    node.scrollIntoView({ behavior: 'smooth' });
  }
  
  useEffect(() => {
    apiServices.getQuiz(quizId)
    .then(res => {
      setQuizData(res.data);
      res.data.questions.forEach(question => setAnswer(answer => new Map(answer.set(question.questionId, []))));
    })
    .catch(err => console.log(err));
  }, []);

  return (
    <Container className='p-2'>
      <Row className='position-relative p-1'>
        <Col xs={9} className='border p-2 me-2'>
          <Timer quizData={quizData} />
          {
            quizData && quizData.questions.map((question, index) => <ExamQuestion getMap={getMap} key={question.questionId} question={question} index={index} answer={answer} setAnswer={setAnswer} />)
          }
        </Col>
        <Col className='border'>
          <Col className='sticky-top'>
            <Row className='p-2' style={{backgroundColor: '#e8ebeb'}}>
              <p>Quiz navigation</p>
            </Row>
            <Row>
              <Container className='d-flex justify-content-start flex-wrap p-2'>
                {
                  quizData && quizData.questions.map((question, index) => 
                    <QuestionSelectBox key={question.questionId} question={question} index={index} handleClick={handleScrollToQuestion} answer={answer}/>
                  )
                }
              </Container>
            </Row>
            <p onClick={() => console.log(answer)} style={{cursor: 'pointer', color: 'blue'}}>Finish attempt ...</p>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
