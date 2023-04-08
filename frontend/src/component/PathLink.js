import React from 'react'
import { Button, Container, Dropdown, Stack } from 'react-bootstrap'
import setting from '../icons/setting.png'
import { useLocation } from 'react-router-dom'

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

export default function PathLink() {

  const path = useLocation().pathname.split('/').filter(item => item !== '');
  let pathStr = 'localhost:3000';

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
                <a href='#'>Question</a>
                <a href='#'>Categories</a>
                <a href='#'>Import</a>
                <a href='#'>Export</a>
              </Stack>
            </Container>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
      <Container className='mb-2 d-flex'>
        <a href='/' style={{textDecoration: 'none', marginRight: '5px'}}>Home</a>
        {
          path.map(item => {
            pathStr += '/' + item;
            return <a style={{textDecoration: 'none'}} href={pathStr}>{'/ ' + capitalize(item)}</a>
          })
        }
      </Container>
      {useLocation().pathname === '/' && <Container className='d-flex flex-row-reverse mb-2'>
        <Button>
          Turn editing on
        </Button>
      </Container>}
    </Container>
  )
}
