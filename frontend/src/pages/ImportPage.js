import React from 'react'
import { Container } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'

export default function ImportPage() {
  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={2} />
      <Container>
        Import Page
      </Container>
    </Container>
  )
}
