import styled from 'styled-components'

const Attendance = styled.div`
  div {
    .datagrid {
      items-align: center;
      display: flex;
      height: 100%;
      width: 100%;
      max-width: 60rem;
      .gridparent {
        flexgrow: 1;
        width: 40rem;
        .grid {
          padding: auto;
          margin: auto;
        }
      }
      //   @media screen and (max-width: 30rem) {
      //     flex-direction: column;
      //     .gridparent {
      //       flexgrow: 1;
      //       width: 30rem;
      //     }
      //   }
    }
  }
`

export default Attendance
