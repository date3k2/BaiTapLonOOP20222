import React, { useState } from 'react'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import alert from '../../icons/alert.png'

export default function EditQuestionPage() {
  return (
    <Container className='border p-2'>
      <p style={{ color: 'red', fontSize: '30px' }}>
        Adding a Multiple choice question
      </p>
      <div style ={{padding:'25px'}}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text
            style={{ color: 'red', fontSize: '25px' }}>
            General
          </Navbar.Text>
        </Stack>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
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
          <Form.Label column style={{ fontSize: '20px'}}>
            Question name
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13' height='13' />
              <Form.Control type="text" placeholder="Question name" style={{ width: '480px' }} />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px'}}>
            Question text
          </Form.Label>
          <Col >
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13' height='13' style={{ marginBottom: '260px' }} />
              <Form.Control type="text" placeholder="Question text" as="textarea" style={{ height: '300px' }}
              />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Default mark
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13' height='13' />
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
          href='/question/edit'
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
      </div>
    </Container>
  )
}

function QuestionCard({ questionId }) {
  let grades = [100, 90, 83.33333, 80, 75, 70, 66.66667, 60, 50, 40, 33.33333, 30, 25, 20, 16.66667, 14.28571, 12.5, 11.11111, 10, 5];
  let tmp = [];
  for (let i = 0; i < grades.length; ++i) {
    tmp[i] = -grades[grades.length - i - 1];
  }
  grades = grades.concat(tmp)
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
              <option> None </option>
              {grades.map((grade, index) => (
                <option value={index + 1}> {grade}%</option>
              ))}
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