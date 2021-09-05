import styled from 'styled-components'
import { Form } from 'antd'
import 'antd/dist/antd.css'

const Find = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 500px;
  align-items: center;
  border-radius: 20px;
  .box {
    max-width: 400px;
    height: 500px;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    align-items: center;
    border-radius: 20px;
    margin: 2.3rem auto;
    padding: 2.3rem;
    .find-btn {
      background-color: orange;
      border: 1px solid orange;
      border-radius: 5px;
      margin-top: 0.5rem;
      width: 100%;
    }
    .find-btn:hover {
      background-color: #e98533;
      color: black;
    }
    #tabs {
      background-color: rgba(248, 135, 42, 0.918);
    }
  }
`

export default Find
