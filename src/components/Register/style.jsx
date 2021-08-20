import styled from 'styled-components'
import { Form } from 'antd'
import 'antd/dist/antd.css'

const Register = styled(Form)`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  align-content: center;
  .register {
    margin: 1.3rem 1.3rem;
    .element {
      margin: 1.3rem 0;
      .input-verify {
        visibility: hidden;
      }
      .error {
        margin: 0;
        position: relative;
      }
    }
  }
`

export default Register
