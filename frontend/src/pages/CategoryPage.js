import React, { useState } from 'react'
import OptionsPanel from '../component/OptionsPanel'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import alert from '../icons/alert.png'
import questionmark from '../icons/questionmark.png'

export default function Category() {
  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={1} />
      <div style={{ padding: '25px' }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text
            style={{ color: 'red', fontSize: '25px' }}>
            Add category
          </Navbar.Text>
        </Stack>

        <br />
        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Parent category
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select style={{ width: '350px' }}>
                <option>Default</option>
              </Form.Select>
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <Form.Group as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
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
          <Form.Label column style={{ fontSize: '20px' }}>
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
          <Form.Label column style={{ fontSize: '20px' }}>
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
        <div style={{ display: "flex", justifyContent: 'center' }}>
          <Button
            variant='danger'
            href='/category'
          >
            ADD CATEGORY
          </Button>
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: 'center' }}>
          <Stack direction="horizontal" gap={1}>
            <p > There are required fields in this form marked</p>
            <img src={alert} width='13px' height='13px' style={{ marginBottom: '13px' }} />
          </Stack>
        </div>

      </div>
    </Container >
  )
}
