import styled from 'styled-components'
import 'antd/dist/antd.css'

const Home = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-top: 40px;
  padding-bottom: 40px;
  .container {
    border-radius: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    box-sizing: border-box !important;
    margin: 1.3rem auto;
    padding: 2.3rem;
    .element {
      margin: 1.3rem 0;
      max-width: 500px;
    }
  }
`

export default Home
