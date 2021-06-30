import styled from 'styled-components'

const QrScan = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  .box {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    height: 500px;
    width: 100%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    align-items: center;
    border-radius: 20px;
    
    .qrscan {
      margin-top: 30px;
      // canvas {
      //   height: 160px !important;
      //   width: 160px !important;
      // }
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