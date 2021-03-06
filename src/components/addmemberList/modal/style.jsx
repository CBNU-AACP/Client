import styled from 'styled-components'

const Addmembermodal = styled.div`
  .plusdiv {
    display: flex;
    .plusbutton {
      padding: 0;
      display: flex;
      .plus {
        width: 30px;
        height: 30px;
      }
      .plus:hover {
        color: green;
      }
    }
    .plustext {
      display: inline;
      margin: auto 0;
    }
  }
  .frame{
    .modal{
      top: 50%,
      left: 50%,
      -webkit-transform: translate(-50%, -50%),
      -ms-transform: translate(-50%, -50%),
      -moz-transform: translate(-50%, -50%),
      -o-transform: translate(-50%, -50%),
      transform: translate(-50%, -50%),
      position: absolute,
      width: 60vw,
      maxWidth: 100%,
      height: 45vh,
      backgroundColor: white,
      padding: spacing(2, 4, 3)},
    }
  }
`

export default Addmembermodal
