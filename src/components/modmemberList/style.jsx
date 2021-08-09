import styled from 'styled-components'

const AddMember = styled.div`
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
  }

  .plustext {
    display: inline;
    margin: auto 0;
  }
  .member {
  }
`

export default AddMember
