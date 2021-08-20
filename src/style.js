import styled from 'styled-components'

const App = styled.div`
  margin: auto;
  .appbar {
    display: flex;
    text-align: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    position: fixed;
    bottom: 0;
    width: 100%;
    .bar {
      display: flex;
      margin: auto;
      .iconList {
        width: 50px;
        height: 40px;
        border-radius: 5px;
        margin: 0.4rem 1rem;
        .icon {
          font-size: 1.5rem;
        }
        .label {
          font-size: 0.7rem;
          margin: 0;
        }
      }
      .iconList:active {
        .icon {
          color: orange;
        }
        .label {
          color: orange;
        }
      }
    }
  }
`

export default App
