import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, Stack } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'
import apiServices from '../services/apiServices';

export default function ExportPage() {

  const [quizList, setQuizList] = useState([]);
  const [hasPassword, setHasPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleExport = () => {
    if(confirmPassword !== password){
      setErrorMessage("Confirm password doesn't match password!");
      return;
    } else setErrorMessage("");
  }

  useEffect(() => {
    apiServices.getAllQuiz()
    .then(res => setQuizList(res.data))
    .catch(err => console.log(err));
  }, [])

  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={3} />
      <Container className='p-0 ps-3 py-3'>
        <p style={{color: 'red', fontSize: '30px'}}>Export quiz</p>
        <Row>
          <Col xs={2}>
            <p className='pt-1 text-danger'>Choose quiz to export:</p>
          </Col>
          <Col>
            <Form.Select className='mb-3' style={{width: "250px"}} defaultValue='-1'>
            <option value='-1' disabled hidden>--- Select a quiz ---</option>
              {
                quizList.map((item, index) => {
                return <option key={index} value={item.quizId}>{item.quizName}</option>
              })
            } 
            </Form.Select>
            <Form.Check value={hasPassword} label="Set password" onChange={() => {setHasPassword(hasPassword => !hasPassword); setPassword(''); setConfirmPassword(''); setErrorMessage('')}}/>
            { hasPassword ?
              <Col>
                <Row className='my-2'>
                  <Col><p>Password:</p></Col>
                  <Col xs={10}><Form.Control value={password} style={{width: '300px'}} onChange={e => setPassword(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col><p>Confirm password:</p></Col>
                  <Col xs={10}><Form.Control value={confirmPassword} style={{width: '300px'}} onChange={e => setConfirmPassword(e.target.value)} /></Col>
                </Row>
              </Col>
              : null
            }
            {
              errorMessage.length > 0 ?
              <p className='m-0 text-danger fw-bold'>
                {errorMessage}
              </p>
              : null
            }
            <Button className='mt-3' onClick={handleExport}>Export</Button>
          </Col>
          </Row>
      </Container>
    </Container>
  )
}
