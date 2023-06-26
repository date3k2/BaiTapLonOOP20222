import React, { useEffect, useState } from 'react'
import OptionsPanel from '../component/OptionsPanel'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import alert from '../icons/alert.png'
import questionmark from '../icons/questionmark.png'
import apiServices from '../services/apiServices';
import { Category } from '../models/Category'

export default function CategoryPage() {
  const [filledName, setFilledName] = useState("");
  const [filledInfo, setFilledInfo] = useState("");
  const [id, setId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [parentID, setParentID] = useState(0);

  const handleChangeName = (event) => {
    setFilledName(event.target.value);
  };
  const handleChangeInfo = (event) => {
    setFilledInfo(event.target.value);
  };
  const handleChangeId = (event) => {
    setId(event.target.value);
  };
  const handleParentSelect = (event) => {
    setParentID(event.target.value);
  };

  useEffect(() => {
    apiServices.getCategory()
      .then(res => {
        setCategories(res.data)
      })
      .catch(error => console.log(error));
  }, []);

  const handleAddCategory = (event) => {
    event.preventDefault();
    const categoryData = new Category(filledName,filledInfo);
    console.log(parentID)
    apiServices.postCategory(parentID, categoryData)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => console.log(error));
  };

  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={1} />
      <div style={{ padding: '25px' }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown
            disabled
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
              <Form.Select onChange={handleParentSelect} style={{ width: '350px' }}>
                <option value={0}> Default </option>
                {categories.map((category, index) => (
                  <option key={index} value={category.id}> {category.name}</option>
                ))}
              </Form.Select>
            </Stack>
          </Col>
        </Form.Group>


        <br />

        <Form.Group class="d-flex bd-highlight" as={Row}>
          <Form.Label column style={{ fontSize: '20px' }}>
            Name
          </Form.Label>
          <Col>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' />
              <Form.Control onChange={handleChangeName} type="text" style={{ width: '480px' }} />
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
              <Form.Control onChange={handleChangeInfo} type="text" as="textarea" style={{ height: '300px' }} />
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
              <Form.Control onChange={handleChangeId} type="text" style={{ width: '100px' }} />
            </Stack>
          </Col>
        </Form.Group>

        <br />

        <div style={{ display: "flex", justifyContent: 'center' }}>
          <Button
            onClick={handleAddCategory }
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
            <img src={alert} width='13px' height='13px' style={{ marginBottom: '14px' }} />
          </Stack>
        </div>
      </div>
    </Container >
  )
}
