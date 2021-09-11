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
    .input-find {
      margin: 0.5rem auto;
    }
    .btn-find {
      /* background-color: orange; */
      border: 2px solid orange;
      border-radius: 5px;
      margin: 0 0.5rem;
      color: black;
    }
    .btn-find:hover {
      background-color: #ff9844;
      color: white;
    }
    #tabs {
      background-color: rgba(248, 135, 42, 0.918);
    }
  }
`

export default Find
