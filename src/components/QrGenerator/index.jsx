import { AiOutlineReload, AiOutlineClockCircle } from 'react-icons/ai'
import axios from 'axios'
import QR from 'react-qr-code'
import React, { useState, useEffect } from 'react'
import StyledQrGen from './style'

function QrGenerator() {
  const [user, setUser] = useState('No Id')
  const [error, setError] = useState(null)
  const [timer, setTimer] = useState(15)
  const [ValidNum, setValidNum] = useState(0)

  const sendValidNum = async () => {
    try {
      setError(null)
      await axios.patch('http://localhost::3001/v1', {
        ValidNum,
      })
    } catch (e) {
      setError(e)
    }
  }

  const reload = () => {
    let num = ValidNum
    setValidNum((num += 1))
    setTimer(15)
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        setError(null)
        const response = await axios.get('http://localhost::3001/v1')
        setUser(response.data)
      } catch (e) {
        setError(e)
      }
    }
    getUsers()
  }, [])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(timer, 10) > 0) {
        setTimer(parseInt(timer, 10) - 1)
        if (parseInt(timer, 10) === 15) {
          sendValidNum()
        }
      }
      if (parseInt(timer, 10) === 1) {
        let num = ValidNum
        setValidNum((num += 1))
        setTimer(15)
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [timer])

  return (
    <StyledQrGen>
      <div className="box">
        <div className="qrcode">
          <QR value={`{"userId": "${user}", "validNum": "${ValidNum}"}`} />
        </div>
        <div className="desc">
          <p className="info">{`"${user}"`} 님의 출석 QR 코드</p>
          <p className="time1">
            <AiOutlineClockCircle className="time_clock" />
            남은 시간{' '}
          </p>
          <p className="time2">{timer < 10 ? `0${timer}` : timer}초</p>
        </div>
        <button type="button" className="reload">
          <AiOutlineReload onClick={reload} />
        </button>
      </div>
      <div className="print">QR 코드를 스캐너에 보여주세요.</div>
    </StyledQrGen>
  )
}

export default QrGenerator
