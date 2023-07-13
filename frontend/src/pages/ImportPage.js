import React, { useEffect, useState } from 'react'
import {Button, Col, Container, Row, Toast } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'
import { FileUploader } from "react-drag-drop-files"
import apiServices from '../services/apiServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Category from '../component/Category'

export default function ImportPage() {

  const [file, setFile] = useState();
  const [category, setCategory] = useState();

  const handleInputChange = (file) => {
    setFile(file);
  }

  const handleChooseCategory = (e) => {
    setCategory(e.target.value);
  }

  const onUpload = () => {
    if(file == null){
      toast.error("Please choose a file!");
      return;
    }
    if(category == null){
      toast.error("Please choose a category!");
      return;
    }
    apiServices.postImportQuestions(category, file)
    .then(res => {
        toast.success(res.data);
    })
    .catch(err => toast.error(err.response.data));
  }

  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={2} />
      <Container className='p-0 py-3 ps-3'>
        <p style={{color: 'red', fontSize: '30px'}}>Import questions from file</p>
        <Container className='p-0'>
          <Row>
            <Col><p style={{color: 'red'}}>File format</p></Col>
            <Col> <p>Aiken format</p></Col>
          </Row>
        </Container>
        <hr />
        <Container className='p-0'>
          <p style={{color: 'red'}}>General</p>
        </Container>
        <hr />
        <Container className='p-0'>
          <p style={{color: 'red'}}>Import question from file</p>
          <Container className='p-0'>
            <Row>
              <Col><p>Import</p></Col>
              <Col>
                <Category handleCategory={handleChooseCategory} />
                <FileUploader 
                  handleChange={(file) => handleInputChange(file)} 
                  name='file' 
                  types={['txt', 'docx']}
                  maxSize={100}
                  label="Upload or drop file here"
                />
                <p>Maximum size for new file: 100MB</p>
                <Button onClick={onUpload}>
                  Import
                </Button>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
      <ToastContainer hideProgressBar autoClose={3000} />
    </Container>
  )
}
