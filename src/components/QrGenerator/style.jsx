import styled from 'styled-components'

const QrGen = styled.div`
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
    .name {
      font-size: 1.7rem;
      font-weight: bold;
      margin-top: 43px;
    }
    .number {
      margin: 10px 0;
      display: flex;
      .phone-icon {
        margin-top: -2px;
        margin-right: 1px;
      }
    }
    .qrcode {
      margin-top: 67px;
      canvas {
        height: 160px !important;
        width: 160px !important;
      }
    }
    .blur {
      opacity: 0.1;
    }
    .desc {
      margin-top: 15px;
      font-size: 0.75rem;
      text-align: center;
      .info {
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1.2rem;
      }
      .time_clock {
        font-weight: bold;
        vertical-align: middle;
      }
      .time1,
      .time2 {
        display: inline;
        text-align: center;
        font-size: 1rem;
      }
      .time2 {
        color: orange;
      }
      .blocking {
        color: orange;
        font-size: 1rem;
        display: inline;
      }
      p {
        margin: 0.6rem 0;
      }
    }
    .reload {
      font-size: 2rem;
      margin-top: 1rem;
    }
    .warning {
      font-size: 1rem;
      margin-top: 1rem;
    }
  }
  .print {
    margin-top: 2rem;
    color: gray;
  }
`

export default QrGen
