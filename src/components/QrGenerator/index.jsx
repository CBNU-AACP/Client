import { AiOutlineReload, AiOutlineClockCircle } from 'react-icons/ai'
import QR from 'react-qr-code'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import StyledQrGen from './style'
import QrService from '../../services/QrServices'

function QrGenerator() {
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

  // const user = useSelector(state => state.auth.user) // user 상태
  const user = '김동용'

  const [timer, setTimer] = useState(15)
  const [blocking, setBlocking] = useState(false)
  const [count, setCount] = useState(0)
  const [reloadcount, setReloadcount] = useState(1)
  const [clickreload, setClickreload] = useState(false)
  const [validNum, setValidnum] = useState(createValidnum(user))

  const sendValidnum = async num => {
    try {
      console.log('send', num)
      const res = await QrService.put(num)
      return Promise.resolve(res.data.message)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const reload = () => {
    if (blocking === false && reloadcount === 1) {
      setClickreload(true)
      setReloadcount(0)
    }
    setValidnum(createValidnum(user))
  }

  useEffect(() => {
    console.log(clickreload)
  }, [clickreload])

  useEffect(() => {
    console.log(validNum)
    sendValidnum(validNum)
      .then(data => {
        if (count < 4) setCount(count + 1)
        if (clickreload === false) setReloadcount(1)
        else setClickreload(false)
        setTimer(15)
        setBlocking(false)
        console.log(data)
      })
      .catch(e => {
        console.log(e)
      })
  }, [validNum])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(timer, 10) > 0) {
        setTimer(parseInt(timer, 10) - 1)
      }
      if (parseInt(timer, 10) === 0) {
        if (count < 4) {
          setValidnum(createValidnum(user))
        } else setBlocking(true)
      }
    }, 1000)
    return () => clearInterval(countdown)
  }, [timer])

  return (
    <StyledQrGen>
      <div className="box">
        <div className={`qrcode ${blocking === true ? 'blur' : ''}`}>
          <QR value={`{"userId": "test2", "validNum": "${validNum}"}`} />
        </div>
        <div className="desc">
          <p className="info">{`"${user}"`} 님의 출석 QR 코드</p>
          {blocking === false ? (
            <article>
              <p className="time1">
                <AiOutlineClockCircle className="time_clock" />
                남은 시간{' '}
              </p>
              <p className="time2">{timer < 10 ? `0${timer}` : timer}초</p>
            </article>
          ) : (
            <p className="blocking">인증 유효시간 초과</p>
          )}
        </div>
        {count === 4 && blocking === true && (
          <button type="button" className="reload">
            <AiOutlineReload onClick={reload} />
          </button>
        )}
        {clickreload === false && reloadcount === 1 && blocking === false && (
          <button type="button" className="reload">
            <AiOutlineReload onClick={reload} />
          </button>
        )}
        {clickreload === false && reloadcount === 0 && blocking === false && (
          <p className="warning">15초에 한 번 다시 갱신할 수 있습니다.</p>
        )}
      </div>
      <div className="print">QR 코드를 스캐너에 보여주세요.</div>
    </StyledQrGen>
  )
}

export default QrGenerator
