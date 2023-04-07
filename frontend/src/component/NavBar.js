import React, { useEffect, useState } from 'react'
import { Container, Nav, Stack } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import menu from '../icons/menu.png'
import user from '../icons/user.png'

export default function NavBar() {
  return (
    <Navbar bg='primary' variant="dark">
      <Container>
        <Navbar.Brand><img src={menu} width='16' height='16' /></Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Stack direction='horizontal' gap={2}>
            <Navbar.Text color='white'>
              Nguyen
            </Navbar.Text>
            <img src={user} width='16' height='16' />
            <NavDropdown id="basic-nav-dropdown">
            </NavDropdown>
          </Stack>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
