import styled from 'styled-components'

const QrScan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  .box {
    display: flex;
    flex-direction: column;
    height: 500px;
    align-items: center;
    border-radius: 20px;
    .scan {
      height: 300px !important;
      width: 300px !important;
      div {
        box-sizing: border-box !important;
        border: 50px solid rgba(0, 0, 0, 0.3) !important;
        box-shadow: orange 0px 0px 0px 5px inset !important;
      }
    }
    .desc {
      margin-top: 15px;
      font-size: 0.75rem;
      .info {
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1.2rem;
      }
      p {
        margin: 0.6rem 0;
      }
    }
  }
  .print {
    margin-top: 2rem;
    color: gray;
  }
`

export default QrScan
