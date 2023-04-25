import React from 'react'
import { Container } from 'react-bootstrap'
import OptionsPanel from '../../component/OptionsPanel'

export default function QuestionPage() {
  return (
    <Container className='border p-2'>
      <OptionsPanel activeTab={0} />
      <Container>
        Question Page
      </Container>
    </Container>
  )
}
