import styled from 'styled-components'
import { Form } from 'antd'
import 'antd/dist/antd.css'

const Register = styled(Form)`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
  .register {
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    box-sizing: border-box !important;
    margin: 1.3rem auto;
    padding: 2.3rem;
    .element {
      margin: 1.3rem 0;
      max-width: 500px;
      input {
        /* max-width: 800px; */
      }
      button {
        background-color: orange;
        border: 1px solid orange;
        border-radius: 5px;
        margin-top: 0.5rem;
      }
      button:hover {
        background-color: #e98533;
      }
      .input-verify {
        visibility: hidden;
      }
      .error {
        margin: 0;
        position: relative;
      }
      .timer {
        color: #1fbb00;
      }
    }
  }
`

export default Register
