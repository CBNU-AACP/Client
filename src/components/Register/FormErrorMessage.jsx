import React from 'react'
import styled from 'styled-components'

const StyledFormErrorMessage = styled.div`
  position: absolute;
  padding-left: 5px;
  color: orange;
`

function FormErrorMessage(message) {
  const { Message } = message
  return <StyledFormErrorMessage>{Message}</StyledFormErrorMessage>
}

export default FormErrorMessage
