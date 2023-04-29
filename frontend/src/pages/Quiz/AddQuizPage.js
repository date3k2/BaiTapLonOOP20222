import React, { useState } from 'react'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import alert from '../../icons/alert.png'

export default function AddQuizPage() {
  const [show, setShow] = useState(false);

  return (
    <Container className='border p-2'>
      <p style={{ color: 'red', fontSize: '30px' }}>
        Adding a Multiple choice question
      </p>
      <Stack direction="horizontal" gap={2}>
        <NavDropdown
          style={{ color: 'blue', fontSize: '20px', marginLeft: '25px' }}>
        </NavDropdown>
        <Navbar.Text
          style={{ color: 'red', fontSize: '20px' }}>
          General
        </Navbar.Text>
      </Stack>

      <br />
      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Category
        </Form.Label>
        <Col>
          <Form.Select style={{ marginLeft: '20px', width: '350px' }}>
            <option>Default</option>
          </Form.Select>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Question name
        </Form.Label>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <img src={alert} width='12' height='12' />
            <Form.Control type="text" placeholder="Question name" style={{ width: '480px' }} />
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Question text
        </Form.Label>
        <Col >
          <Stack direction="horizontal" gap={2}>
            <img src={alert} width='12' height='12' style={{ marginBottom: '260px' }} />
            <Form.Control type="text" placeholder="Question text" as="textarea" style={{ height: '300px' }} 
            />
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Default mark
        </Form.Label>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <img src={alert} width='12' height='12' />
            <Form.Control type="text" style={{ width: '100px' }} defaultValue="1" />
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <QuestionCard
        questionId={1}
      />
      <QuestionCard
        questionId={2}
      />
      <AddChoice />
      <br />
      <Button
        variant='primary'
        style={{ marginLeft: '400px', marginTop: '50px' }}
        href='/quiz/add'
      >
        SAVE CHANGE AND CONTINUE EDITING
      </Button>
      <br />
      <Button
        variant="danger"
        style={{ marginLeft: '400px', marginTop: '30px' }}
        href='/'
      >
        SAVE CHANGES
      </Button>
      <Button
        variant='primary'
        style={{ marginLeft: '20px', marginTop: '30px' }}
        href='/'
      > CANCEL
      </Button>

    </Container>
  )
}

function QuestionCard({ questionId }) {
  return (
    <Card
      style={{
        width: '550px',
        height: '300px',
        marginLeft: '560px',
        marginTop: '20px',
        backgroundColor: '#f0eeed'
      }}>
      <Card.Body>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Choice {questionId}
          </Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              type="text"
              style={{ width: '410px', height: '80px' }}
            />
          </Col>
        </Form.Group>
        <br />
        <Form.Group as={Row} >
          <Form.Label column style={{ fontSize: '20px' }}>
            Grade
          </Form.Label>
          <Col >
            <Form.Select
              style={{ marginRight: '250px', width: '160px' }}
            >
              <option value="1">None</option>
              <option value="2">100%</option>
              <option value="3">90%</option>
              <option value="4">83.33333%</option>
              <option value="5">80%</option>
              <option value="6">75%</option>
              <option value="7">66.66667%</option>
              <option value="8">60%</option>
              <option value="9">50%</option>
              <option value="10">40%</option>
              <option value="11">33.33333%</option>
              <option value="12">25%</option>
              <option value="13">16.66667%</option>
              <option value="14">14.28571%</option>
              <option value="15">12.5%</option>
              <option value="16">11.11111%</option>
              <option value="17">10%</option>
              <option value="18">5%</option>
              <option value="19">2%</option>
              <option value="20">0%</option>
            </Form.Select>
          </Col>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}

function AddChoice() {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      {isShow ? (
          <>
            <QuestionCard
              questionId={3}
            />
            <QuestionCard
              questionId={4}
            />
            <QuestionCard
              questionId={5}
            />
          </>
        ) : (
          <Button
            variant="primary"
            style={{ marginLeft: '550px', marginTop: '50px' }}
            onClick={() => setIsShow(true)}
          >
            BLANKS FOR 3 MORE CHOICES
          </Button >
        )}
    </>
  );
}