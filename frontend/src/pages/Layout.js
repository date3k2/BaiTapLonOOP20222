import React from 'react'
import Container from 'react-bootstrap/Container'
import NavBar from '../component/NavBar'
import { Outlet } from 'react-router-dom'
import PathLink from '../component/PathLink'

export default function Layout() {
  return (
    <Container>
        <NavBar />
        <PathLink />
        <Outlet />
    </Container>
  )
}
