import React, { useState } from 'react'
import { Button, Container, FormCheck, FormControl, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import alert from '../../icons/alert.png'
import exam from '../../icons/exam.png'
import questionmark from '../../icons/questionmark.png'


export default function AddQuizPage() {
  return (
    <Container className='border p-2'>
      <Stack direction="horizontal" gap={2}>
        <img src={exam} width='15px' height='17px' style={{ marginBottom: '10px' }} />
        <p
          style={{ color: 'red', fontSize: '30px' }}>
          Adding a new Quizz
        </p>
        <img src={questionmark} width='15px' height='15px' style={{ marginBottom: '10px' }} />
      </Stack>

      <div style={{ padding: '25px' }}>
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
            Name
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' />
              <Form.Control type='text' style={{ width: '500px' }} />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Description
          </Form.Label>
          <Col style={{ marginLeft: '42px' }} >
            <Form.Control type="text" as="textarea" style={{ height: '300px' }} />

            <Stack direction="horizontal" gap={2}>
              <Form.Check
                type='checkbox'
                label='Display description on course page'
              />
              <img src={questionmark} width='13px' height='13px' />
            </Stack>
          </Col>
        </Form.Group>

        <hr />
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text
            style={{ color: 'red', fontSize: '25px' }}>
            Timing
          </Navbar.Text>
        </Stack>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Open the quizz
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select style={{ width: '50px' }}>
                {
                }
              </Form.Select >
              <Form.Select style={{ width: '150px' }}>

              </Form.Select>
              <Form.Select style={{ width: '100px' }}>

              </Form.Select>
              <Form.Select style={{ width: '50px' }}>

              </Form.Select>
              <Form.Select style={{ width: '50px' }}>

              </Form.Select>
              <Form.Check
                type='checkbox'
                label='Enable'
              />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Close the quizz
          </Form.Label>
          <Col style={{ marginLeft: '42px' }}>
            <Stack direction="horizontal" gap={2}>
              <Form.Select style={{ width: '50px' }}>
                {
                }
              </Form.Select >
              <Form.Select style={{ width: '150px' }}>

              </Form.Select>
              <Form.Select style={{ width: '100px' }}>

              </Form.Select>
              <Form.Select style={{ width: '50px' }}>

              </Form.Select>
              <Form.Select style={{ width: '50px' }}>

              </Form.Select>
              <Form.Check
                type='checkbox'
                label='Enable'
              />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Time limit
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <FormControl type='text' style={{ width: '100px' }} />
              <Form.Select style={{ width: '100px' }}>
                <option value={1}>
                  minutes
                </option>
                <option value={2}>
                  hours
                </option>
              </Form.Select>
              <Form.Check
                type='checkbox'
                label='Enable'
              />
            </Stack>
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            When time expires
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select style={{ width: '300px' }}>
                <option>Opens attempts are submitted automatic</option>
              </Form.Select>
            </Stack>
          </Col>
        </Form.Group>
      </div>
      <br />
      <div style={{ display: "flex", justifyContent: 'center' }}>
        <Button variant="danger">Create </Button>
        <Button variant="primary" style={{marginLeft:'10px'}}>Cancel </Button>
      </div>
    </Container >
  )
}
