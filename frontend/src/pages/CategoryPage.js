import React, { useEffect, useState } from 'react'
import OptionsPanel from '../component/OptionsPanel'
import { Button, Container, NavDropdown, Stack } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar';
import { Col, Form, Row } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";
import alert from '../icons/alert.png'
import questionmark from '../icons/questionmark.png'
import apiServices from '../services/apiServices';
import { Category } from '../models/Category'
import { Navigate, redirect, useNavigate } from 'react-router-dom'

export default function CategoryPage() {
  const [filledName, setFilledName] = useState("");
  const [filledInfo, setFilledInfo] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentID, setParentID] = useState(null);
  const navigate = useNavigate()

  const handleChangeName = (event) => {
    setFilledName(event.target.value);
  };
  const handleChangeInfo = (event) => {
    setFilledInfo(event.target.value);
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
    if (filledName == "" || filledInfo == "") {
      toast.warning("Name and info need to be completed");
      return;
    }
    const categoryData = new Category(filledName, filledInfo);
    console.log(parentID)
    if (parentID == 'Default' || parentID == null) {
      axios.post(`https://localhost:7114/api/v1/Categories`, categoryData)
        .then(res => {
          console.log(res.data);
          navigate(0);
        })
        .catch(error => console.log(error));
    }
    else {
      apiServices.postCategory(parentID, categoryData)
        .then(res => {
          console.log(res.data);
          navigate(0);
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={1} />
      <div style={{ padding: '25px' }}>
        <Stack direction="horizontal" gap={2}>
          <NavDropdown disabled style={{ color: 'blue', fontSize: '25px' }}>
          </NavDropdown>
          <Navbar.Text style={{ color: 'red', fontSize: '25px' }}>
            Add category
          </Navbar.Text>
        </Stack>

        <br />
        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Parent category
          </Col>
          <Col style={{marginLeft: '50px'}} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Select value={parentID} onChange={handleParentSelect} style={{ width: '300px' }}>
                <option>Default </option>
                {categories.slice(1).map((category, index) => (
                  <option key={index} value={category.id}>{`${'\xa0'.repeat(category.level * 2)}`} {category.name}</option>
                ))}
              </Form.Select>
            </Stack>
          </Col>
        </div>

        <br />
        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Name
          </Col>
          <Col style={{marginLeft: '50px'}} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' />
              <Form.Control onChange={handleChangeName} type="text" style={{ width: '400px' }} />
            </Stack>
          </Col>
        </div>

        <br />

        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            Category info
          </Col>
          <Col style={{marginLeft: '50px'}} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={alert} width='13px' height='13px' style={{ marginBottom: '260px' }} />
              <Form.Control onChange={handleChangeInfo} type="text" as="textarea" style={{ width:'600px', height: '300px' }} />
            </Stack>
          </Col>
        </div>

        <br />

        <div className='row justify-content-start'>
          <Col className='col-4' style={{ fontSize: '20px' }}>
            ID number
          </Col>
          <Col style={{marginLeft: '50px'}} className='col-6'>
            <Stack direction="horizontal" gap={2}>
              <img src={questionmark} width='13px' height='13px' />
              <Form.Control type="text" style={{ width: '100px' }} />
            </Stack>
          </Col>
        </div>

        <br />
        <div style={{ marginTop:'40px', display: "flex", justifyContent: 'center' }}>
          <Button onClick={handleAddCategory} variant='danger' href='/category'>
            ADD CATEGORY
          </Button>
          <ToastContainer hideProgressBar autoClose={3000}></ToastContainer>
        </div>

        <div style={{ marginTop:'15px', display: "flex", justifyContent: 'center' }}>
          <Stack direction="horizontal" gap={1}>
            <p style={{fontSize:'18px'}}> There are required fields in this form marked</p>
            <img src={alert} width='13px' height='13px' style={{ marginBottom: '14px' }} />
          </Stack>
        </div>
      </div>
    </Container >
  )
}
