import styled from 'styled-components'
import { Form } from 'antd'
import 'antd/dist/antd.css'

const Login = styled(Form)`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
  .login {
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    box-sizing: border-box !important;
    margin: 2.3rem auto;
    padding: 2.3rem;
    width: 50%;
    .element {
      margin: 1.3rem 0;
      /* width: 142%; */
      .input-login {
        flex-wrap: nowrap;
        width: 142%;
      }
      .login-btn {
        background-color: orange;
        border: 1px solid orange;
        border-radius: 5px;
        margin-top: 0.5rem;
        width: 80%;
      }
      .login-btn:hover {
        background-color: #e98533;
      }
    }
    .element-btn {
      margin: 1rem;
      display: inline-flex;
      .iconList {
      }
    }
    .element-btn:hover {
      text-decoration: underline;
    }
  }
`

export default Login
