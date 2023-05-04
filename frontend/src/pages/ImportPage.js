import React, { useEffect, useState } from 'react'
import {Button, Col, Container, Row } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'
import { FileUploader } from "react-drag-drop-files"
import axios from 'axios'

export default function ImportPage() {

  const URL = 'https://2d44bbf9-c927-4cc0-886b-6008d8fe87a7.mock.pstmn.io'

  const [file, setFile] = useState();

  const onUpload = () => {
    const formData = new FormData();

    formData.append(
      "questionFile",
      file
    );
    console.log(formData)
    axios.post(URL, formData);
  }

  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={2} />
      <Container className='p-0'>
        <p style={{color: 'red', fontSize: '30px'}}>Import questions from file</p>
        <Container>
          <Row>
            <Col><p style={{color: 'red'}}>File format</p></Col>
            <Col> <p>Aiken format</p></Col>
          </Row>
        </Container>
        <hr />
        <Container>
          <p style={{color: 'red'}}>General</p>
        </Container>
        <hr />
        <Container>
          <p style={{color: 'red'}}>Import question from file</p>
          <Container className='p-0'>
            <Row>
              <Col><p>Import</p></Col>
              <Col>
                <FileUploader 
                  label="Upload or drop file here" 
                  handleChange={(file) => setFile(file)} 
                  name='file' 
                  types={['doc', 'docx']}
                  maxSize={100}
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
    </Container>
  )
}
