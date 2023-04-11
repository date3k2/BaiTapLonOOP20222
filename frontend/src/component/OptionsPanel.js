import React from 'react'
import { Nav } from 'react-bootstrap'

export default function OptionsPanel({ activeTab }) {

  let linkList = ['/question', '/category', '/import', '/export'];

  return (
    <Nav variant='tabs' activeKey={linkList[activeTab]}>
      <Nav.Item>
        <Nav.Link href='/question'>Question</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/category'>Categories</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/import'>Import</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href='/export'>Export</Nav.Link>
      </Nav.Item>
    </Nav>
  )
}
