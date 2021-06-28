import { AiOutlineReload, AiOutlineClockCircle } from "react-icons/ai";
import axios from 'axios'
import QR from 'react-qr-code'
import React, { useState, useEffect } from 'react'
import StyledQrGen from './style'

function QrGenerator() {
  const [user, setUser] = useState('No Id');
  const [error, setError] = useState(null);
  const [timer, setTimer] = useState(15);
  const [ValidNum, setValidNum] = useState(0);

  const sendValidNum = async () => {
    try {
      setError(null);
      await axios.patch(
        'http://5ba74d5a0619.ngrok.io/v1',
        {
            ValidNum: ValidNum
        }
      );
    } catch (e) {
      setError(e);
    }
  };

  const reload = () =>{
    var num = ValidNum;
    setValidNum(num+=1);
    setTimer(15);
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        setError(null);
        const response = await axios.get(
          'http://5ba74d5a0619.ngrok.io/v1'
        );
        setUser(response.data);
      } catch (e) {
        setError(e);
      }
    };
    getUsers();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(timer) > 0) {
        setTimer(parseInt(timer) - 1);
        if(parseInt(timer)===15){
            sendValidNum();
        }
      }
      if (parseInt(timer) === 1) {
        var num = ValidNum;
        setValidNum(num+=1);
        setTimer(15);
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  return (
    <StyledQrGen>
      <div className="box">
        <div className="qrcode">
          <QR value={`[{UserName:${user}, ValidNum:${ValidNum}]`}/>
        </div>
        <div className="desc">
          <p className="info">{`"${user}" 님의 출석 QR 코드`}</p>
          <p className="time1"><AiOutlineClockCircle className="time_clock"/>남은 시간 </p>
          <p className="time2">{timer < 10 ? `0${timer}`: timer}초</p>
        </div>
        <button className="reload">
          <AiOutlineReload onClick={reload}/>
        </button>
      </div>
      <div className="print">QR 코드를 스캐너에 보여주세요.</div>
    </StyledQrGen>
  )
}

export default QrGenerator