import styled from 'styled-components'

const CrCourse = styled.div`
  margin: 8rem 0 0 0;
  align-items: center;
  max-width: 300px;
  width: 100%;
  height: 200px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 20px;
  .container {
    margin: auto;
    .formGroup {
      margin: 2rem auto;
      width: max-content;
      .form {
        margin: 1rem;
        .icons {
          .icon {
            font-size: 1.3rem;
          }
          .label {
            margin: auto 0.2rem;
            font-size: 0.8rem;
          }
        }
        input {
          font-size: 0.7rem;
          border: 0;
          border-bottom: 2px solid black;
        }
        input::placeholder {
          font-size: 0.7rem;
        }
      }
      .submit {
        margin: 0 0 0 6.7rem;
        display: flex;
        background-color: #dcdcdc;
        border-radius: 5px;
        .icon {
          font-size: 1.4rem;
        }
        .label {
          margin: auto;
          font-size: 0.8rem;
        }
      }
      .submit:hover {
        background-color: #c8c8c8;
        .icon {
          color: orange;
        }
      }
    }
  }
`

export default CrCourse
