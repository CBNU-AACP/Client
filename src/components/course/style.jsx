import styled from 'styled-components'

const Course = styled.div`
  margin-top: 80px;
  .container {
    .topbar {
      background-color: white;
      align-items: center;
      flex-direction: column;
      display: flex;
      margin: auto;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      position: fixed;
      top: 0;
      width: 100%;
      .icons {
        display: flex;
        list-style: none;
        .iconList {
          margin: 0.4rem 0.5rem;
          padding: 0.4rem 0.5rem;
          text-align: center;
          border-radius: 10px;
          .icon {
            font-size: 1.3rem;
          }
          p {
            font-size: 0.7rem;
          }
        }
        .iconList:active {
          background-color: orange;
        }
      }
    }
    .components {
      display: flex;
      flex-direction: column;
      margin: auto;
      max-width: 800px;
      height: 100%;
      width: 100%;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      align-items: center;
      text-align: center;
      border-radius: 20px;
    }
  }
`

export default Course
