import styled from 'styled-components'

const CrCourse = styled.form`
  height: 730px;
  margin-top: 7rem;
  .container {
    max-width: 300px;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 20px;
    .formGroup {
      margin: 1rem auto;
      .form {
        margin: 1rem;
        font-size: 0.8rem;
        .icons {
          display: flex;
          .icon {
            font-size: 1.3rem;
          }
          .label {
            margin: auto 0.2rem;
            font-size: 0.8rem;
          }
        }
        .input {
          margin-bottom: 0.2rem;
          width: 12rem;
          font-size: 0.7rem;
          border: 0;
          border-bottom: 2px solid black;
        }
      }
      .submit {
        margin: 0 0 1rem 8rem;
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
      .submit:active {
        background-color: #c8c8c8;
        .icon {
          color: orange;
        }
      }
    }
  }
`

export default CrCourse
