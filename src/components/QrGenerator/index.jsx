import { AiOutlineReload, AiOutlineClockCircle } from 'react-icons/ai'
import axios from 'axios'
import QR from 'react-qr-code'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import StyledQrGen from './style'
import QrService from '../../services/QrServices'

function QrGenerator() {
  const [error, setError] = useState(null)
  const [timer, setTimer] = useState(15)
  const [validNum, setValidnum] = useState('')
  const [flag, setFlag] = useState(false) // validNum을 서버에 보낼 준비가 되었는지

  // const user = useSelector(state => state.auth.user) // user 상태
  const user = '김동용'

  const createValidnum = id => {
    const date = new Date()
    const year = date.getFullYear().toString() // 현재 년도 받아오기
    let month = date.getMonth() + 1 // 현재 month 받아오기
    month = month < 10 ? `0${month.toString()}` : month.toString() // month를 2자리 수로 만들기
    const name = `${id}`.charCodeAt(0) // 현재 멤버아이디의 아스키코드 받아오기
    let milie = date.getMilliseconds().toString()
    milie = milie.length >= 3 ? milie : new Array(4 - milie.length).join('0') + milie // 현재의 밀리세컨드를 받아오고 3자리가 될때까지 9을 붙여준다
    return year + month + name + milie
  }

  const sendValidnum = async () => {
    try {
      setError(null)
      const res = await QrService.put(validNum)
      return Promise.resolve(res.data.data)
    } catch (e) {
      setError(e)
      return Promise.reject(e)
    }
  }

  const reload = () => {
    sendValidnum()
    setTimer(15)
  }

  useEffect(() => {
    console.log(flag)
  }, [flag])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(timer, 10) > 0) {
        setTimer(parseInt(timer, 10) - 1)
        if (parseInt(timer, 10) === 15) {
          setValidnum(createValidnum(user)) // timer와 validNum 동기화 필요
          setFlag(true)
          if (flag) {
            sendValidnum()
              .then(data => {
                console.log(data)
                setFlag(false) // 다시 살펴보기
              })
              .catch(e => {
                console.log(e)
              })
          }
        }
      }
      if (parseInt(timer, 10) === 1) {
        setTimer(15)
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [timer])

  return (
    <StyledQrGen>
      <div className="box">
        <div className="qrcode">
          <QR value={`{"userId": "${user}", "validNum": "${validNum}"}`} />
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
