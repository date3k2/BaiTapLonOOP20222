import React from 'react'
import { Container } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'

export default function CategoryPage() {
  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={1} />
      <Container>
        Category Page
      </Container>
    </Container>
  )
}
