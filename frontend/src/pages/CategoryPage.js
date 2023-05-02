import React, { useState } from 'react'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import alert from '../icons/alert.png'
import questionmark from '../icons/questionmark.png'

export default function AddQuizPage() {
  return (
    <Container className='border p-2'>
      <Stack direction="horizontal" gap={2}>
        <NavDropdown
          style={{ color: 'blue', fontSize: '20px', marginLeft: '25px' }}>
        </NavDropdown>
        <Navbar.Text
          style={{ color: 'red', fontSize: '20px' }}>
          Add categoty
        </Navbar.Text>
      </Stack>

      <br />
      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Parent category
        </Form.Label>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <img src={questionmark} width='13px' height='13px' />
            <Form.Select style={{width: '350px'}}>
              <option>Default</option>
            </Form.Select>
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Name
        </Form.Label>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <img src={alert} width='13px' height='13px' />
            <Form.Control type="text" style={{ width: '480px' }} />
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          Category info
        </Form.Label>
        <Col >
          <Stack direction="horizontal" gap={2}>
            <img src={alert} width='13px' height='13px' style={{ marginBottom: '260px' }} />
            <Form.Control type="text" as="textarea" style={{ height: '300px' }}
            />
          </Stack>
        </Col>
      </Form.Group>

      <br />

      <Form.Group as={Row}>
        <Form.Label column style={{ fontSize: '20px', marginLeft: '25px' }}>
          ID number
        </Form.Label>
        <Col>
          <Stack direction="horizontal" gap={2}>
            <img src={questionmark} width='13px' height='13px' />
            <Form.Control type="text" style={{ width: '100px' }} />
          </Stack>
        </Col>
      </Form.Group>
      <br />
      <Button
        variant='danger'
        style={{ marginLeft: '660px' }}
        href='/category'
      >
        ADD CATEGORY
      </Button>
      <br />
      <br />
      <Stack direction="horizontal" gap={1}>
        <p style={{ marginLeft: '550px' }}> There are required fields in this form marked</p>
        <img src={alert} width='13px' height='13px' style={{ marginBottom: '13px' }} />
      </Stack>

    </Container>
  )
}
