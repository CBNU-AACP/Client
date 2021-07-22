import styled from 'styled-components'

const Member = styled.div`
  display: flex;
  .add {
    display: flex;
    .id,
    .name {
      border-radius: 7px;
      width: 100px;
    }
    .submitted_id {
      width: 100px;
      padding: 0 0.3rem 0 0;
      margin: auto;
    }
    .submitted_name {
      width: 100px;
      margin: auto;
    }
    .minus,
    .check,
    .modify {
      width: 30px;
      height: 30px;
    }
    .minus:hover {
      color: red;
    }
    .check:hover {
      color: green;
    }
    .modify:hover {
      color: orange;
    }
  }
`

export default Member
