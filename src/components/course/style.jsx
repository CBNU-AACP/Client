import styled from 'styled-components'

const Course = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  .components {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    height: 800px;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    align-items: center;
    border-radius: 20px;
    .icons {
      display: flex;
      list-style: none;
      .iconList {
        margin: 0.4rem 0.5rem;
        padding: 0.4rem 0.5rem;
        text-align: center;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        .icon {
          font-size: 1.3rem;
        }
        p {
          font-size: 0.7rem;
        }
      }
      .iconList:hover {
        background-color: orange;
      }
    }
  }
`

export default Course
