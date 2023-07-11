import React, { memo, useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Stack } from 'react-bootstrap';
import apiServices from '../services/apiServices';
import { useLocation, useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import correct from '../icons/correct.png'
import wrong from '../icons/wrong.png'

function ExamQuestion({getMap, index, question, answer, setAnswer, isQuizFinished, isShuffle}){

  let correctChoiceList = [];
  question.questionChoices.forEach((choice, index) => {
    if(choice.choiceMark > 0){
      if(choice.choiceText === ""){
        correctChoiceList.push(String.fromCharCode(index + 65));
      }
      else correctChoiceList.push(choice.choiceText);
    } 
  })
  const correctChoice = correctChoiceList.join(", ");

  const handleChooseChoice = (choice, moreThanOneChoice) => {
    if(answer.get(question.questionId).includes(choice)){
      setAnswer(answer => new Map(answer.set(question.questionId, answer.get(question.questionId).filter(item => item != choice))));
    }
    else{ 
      let choices;
      if(moreThanOneChoice){
        choices = answer.get(question.questionId);
        choices.push(choice);
      } else {
        choices = [choice];
      }
      setAnswer(answer => new Map(answer.set(question.questionId, choices)));
    }
  }

  const getMediaType = (s) => {
    return s.split(';')[0].split(':')[1].split('/')[0];
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
        <Col className='p-0'>
          <Container className='m-0 p-2' style={{backgroundColor: '#dcf5f5'}}>
            <p>{question.questionText}</p>
            {
              question.questionMediaPath ? 
              <Container>
                {
                  getMediaType(question.questionMediaPath) == "image" ?
                  <img style={{objectFit: 'fill', maxHeight: '200px', maxWidth: "300px"}} src={question.questionMediaPath} /> :
                  <video style={{maxHeight: '400px', maxWidth: "800px"}} controls src={question.questionMediaPath} />
                }
              </Container> :
              null
            }
            {
              question.questionChoices.map((choice, index) => 
                <Container >
                  <Stack direction='horizontal' className='m-0 p-0'>
                    <Form.Check disabled={isQuizFinished} key={choice.choiceId} type={question.moreThanOneChoice ? 'checkbox' : 'radio'} label={String.fromCharCode(index + 65) + ". " + choice.choiceText} name={question.questionId} onChange={() => handleChooseChoice(choice, question.moreThanOneChoice)}/>
                    {choice.choiceMediaPath ? 
                    <Container>
                      {
                        getMediaType(choice.choiceMediaPath) === "image" ?
                        <img style={{objectFit: 'fill', maxHeight: '200px', maxWidth: "300px"}} src={choice.choiceMediaPath}/> :
                        <video controls src={choice.choiceMediaPath} />
                      }
                    </Container> : 
                    null}
                    {
                      isQuizFinished && answer.get(question.questionId).includes(choice) ? 
                      <Container className='mx-1 p-0' style={{maxWidth: '40px'}}>
                        {
                          correctChoiceList.includes(choice.choiceText) ?
                          <img style={{width: '15px', height: '15px'}} src={correct}/> :
                          <img style={{width: '15px', height: '15px'}} src={wrong}/>
                        }
                      </Container> :
                      null
                    }
                  </Stack>
                </Container>
              )
            }
          </Container>
        </Col>
        {
          isQuizFinished ?
          <Row className='ms-2 mt-2'>
            <Col xs={2}></Col>
            <Col className='bg-warning p-3'>
            <p>              
              The correct answer is: {correctChoice}
            </p>
            </Col>
          </Row>
          : null
          }
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

const Timer = memo(function Timer({quizTimeLimit, handleSubmit}){
  return <Container className='d-flex flex-row-reverse sticky-top'>
  {quizTimeLimit > 0 ? <Countdown date={quizTimeLimit} renderer={CountdownTimer} onComplete={handleSubmit} /> : null}
  </Container>;
});

const Scoreboard = ({timeStart, timeCompleted, quizMarks, totalMark, maximumGrade}) => {

  const DAY_IN_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const startDate = new Date(timeStart);
  const completedDate = new Date(timeCompleted);
  const timeTaken = Math.floor((completedDate - startDate) / 1000);

  return(
    <Container className='my-2 border'>
      <Row>
        <Col className='me-2' xs={2}>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0'>Start on</p></Row>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0' style={{backgroundColor: '#f2f2f2'}}>State</p></Row>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0'>Completed on</p></Row>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0' style={{backgroundColor: '#f2f2f2'}}>Time taken</p></Row>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0'>Mark</p></Row>
          <Row><p className='d-flex flex-row-reverse p-0 fw-bold text-danger m-0' style={{backgroundColor: '#f2f2f2'}}>Grade</p></Row>
        </Col>
        <Col>
          <Row>{DAY_IN_WEEK[startDate.getDay()] + ", " + startDate.toLocaleString()}</Row>
          <Row>Completed</Row>
          <Row>{DAY_IN_WEEK[completedDate.getDay()] + ", " + completedDate.toLocaleString()}</Row>
          <Row>{timeTaken >= 3600 ? Math.floor(timeTaken / 3600).toString() + " hours" : null} {timeTaken >= 60 ? Math.floor((timeTaken % 3600) / 60).toString() + " mins" : null} {Math.floor(timeTaken % 60).toString() + " secs"}</Row>
          <Row>{quizMarks.toFixed(2)} / {totalMark.toFixed(2)}</Row>
          <Row><p className='p-0 m-0'><span className='fw-bold'>{((quizMarks / totalMark) * maximumGrade).toFixed(2)}</span> out of {maximumGrade.toFixed(2)} (<span className='fw-bold'>{(quizMarks * 100 / totalMark).toFixed(0)}</span> %)</p></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default function ExamPage() {

  const [answer, setAnswer] = useState(new Map());
  const ref = useRef(null);

  const path = useLocation();
  const pathArr = path.pathname.split('/')[1].split('+');
  const quizId = pathArr[pathArr.length - 1];
  const [quizData, setQuizData] = useState();
  const navigate = useNavigate();

  const [quizTimeLimit, setQuizTimeLimit] = useState(0);
  const [timeQuizStart, setTimeQuizStart] = useState();
  const [timeQuizFinished, setTimeQuizFinished] = useState();
  const [totalMark, setTotalMark] = useState(0);

  const [isQuizFinished, setIsQuizFinished] = useState(false);
  

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

  const handleSubmit = () => {
    let totalMark = 0;
    answer.forEach(item => {
      item.forEach(i => totalMark += i.choiceMark);
    });
    totalMark = Math.max(0, totalMark);
    setTotalMark(totalMark);
    setTimeQuizFinished(Date.now());
    setIsQuizFinished(true);
  }
  
  useEffect(() => {
    apiServices.getQuiz(quizId)
    .then(res => {
      setQuizData(res.data);
      res.data.questions.forEach(question => setAnswer(answer => new Map(answer.set(question.questionId, []))));
      setQuizTimeLimit(Date.now() + res.data.timeLimitInSeconds * 1000);
    })
    .catch(err => console.log(err));
    setTimeQuizStart(Date.now());
  }, []);

  return (
    <Container className='p-2'>
      <Row className='position-relative p-1'>
        <Col xs={9} className='border p-2 me-2'>
          {
            isQuizFinished ? 
            <Scoreboard timeStart={timeQuizStart} timeCompleted={timeQuizFinished} quizMarks={totalMark} totalMark={quizData.questions.length} maximumGrade={quizData.maxGrade}/>: 
            <Container>
              {
                quizData && quizData.timeLimitInSeconds != null ?
                <Timer quizTimeLimit={quizTimeLimit} handleSubmit={() => handleSubmit()} />
                : null
              }
            </Container>
          }
          {
            quizData && quizData.questions.map((question, index) => <ExamQuestion getMap={getMap} key={question.questionId} question={question} index={index} answer={answer} setAnswer={setAnswer} isQuizFinished={isQuizFinished} isShuffle={quizData.isShuffle}/>)
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
            {
              isQuizFinished ? 
              <p onClick={() => navigate('/')} style={{cursor: 'pointer', color: 'blue'}}>Finish review</p>
              : <p onClick={handleSubmit} style={{cursor: 'pointer', color: 'blue'}}>Finish attempt</p>
            }
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
