import React from 'react'
import { Container } from 'react-bootstrap'
import OptionsPanel from '../component/OptionsPanel'

export default function ExportPage() {
  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={3} />
      <Container>
        Export Page
      </Container>
    </Container>
  )
}
