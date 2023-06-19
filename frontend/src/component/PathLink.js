import React from 'react'
import { Breadcrumb, Button, Container, Dropdown, Stack } from 'react-bootstrap'
import setting from '../icons/setting.png'
import { useLocation } from 'react-router-dom';

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function PathLink() {
  
  const data = useLocation();
  const path = data.pathname.split('/').filter(item => item !== '').map(item => decodeURIComponent(item));
  let pathStr = window.location.protocol + "//" + window.location.host;

  return (
    <Container className='my-2 border p-0'>
      <Container className='d-flex justify-content-between'>
        <p style={{fontSize: '30px', color: 'red'}}>IT</p>
        <Dropdown className='pt-2'>
          <Dropdown.Toggle id="dropdown-basic">
            <img src={setting} width='20' height='20'/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Container className='d-flex' style={{width: '300px'}}>
              <p className='me-5'>Question bank</p>
              <Stack>
                <a href='/question'>Question</a>
                <a href='/category'>Categories</a>
                <a href='/import'>Import</a>
                <a href='/export'>Export</a>
              </Stack>
            </Container>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      <Breadcrumb className='mb-2 ms-2 d-flex'>
        <Breadcrumb.Item href='/' style={{textDecoration: 'none', marginRight: '5px'}}>Home</Breadcrumb.Item>
        {
          path.map((item, index) => {
            pathStr += '/' + item;
            if(item.includes('-')){
              item = item.split('-')[0];
            }
            return <Breadcrumb.Item key={index} href={pathStr}>{capitalize(item.replaceAll("%20", " "))}</Breadcrumb.Item>
          })
        }
      </Breadcrumb>
      {window.location.pathname === '/' && 
      <Container className='d-flex flex-row-reverse mb-2'>
        <Button href='/quiz/add'>
          Turn editing on
        </Button>
      </Container>}
    </Container>
  )
}
