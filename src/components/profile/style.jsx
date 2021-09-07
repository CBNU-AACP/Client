import styled from 'styled-components'
import 'antd/dist/antd.css'

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-top: 10px;
  padding-bottom: 40px;
  .box {
    max-width: 400px;
    height: 500px;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    align-items: center;
    border-radius: 20px;
    margin: 2.3rem auto;
    padding: 2.3rem;
    .jumbotron {
      align-items: center;
      margin: 1.3rem 0;
      width: 142%;
    }
    .element {
      margin: 1.3rem 0;
      /* width: 142%; */
    }
  }
`

export default Profile
