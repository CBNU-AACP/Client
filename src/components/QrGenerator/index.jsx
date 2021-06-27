// import { IoIosCall } from 'react-icons/io'
import axios from 'axios'
import QR from 'react-qr-code'
import React, { useState, useEffect } from 'react'
import StyledQrGen from './style'

function QrGenerator() {
  const [user, setUser] = useState('No Id')
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        // loading 상태를 true 로 바꿉니다.
        const response = await axios.get(
          'http://5ba74d5a0619.ngrok.io/v1'
        );
        setUser(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
    };
    fetchUsers();
  }, []);

  return (
    <StyledQrGen>
      <div className="box">
        <div className="name"></div>
        <div className="number">
          {/* <IoIosCall className="phone-icon" /> */}
        </div>
        <div className="qrcode">
          <QR value={user}/>
        {/* <QR value="www.naver.com"/> */}
        </div>
        <div className="desc">
          <p className="info">{`"김동용"님의 출석 QR Code`}</p>
        </div>
      </div>
      <div className="print">해당 QR Code를 스캐너에 보여주세요.</div>
    </StyledQrGen>
  )
}

export default QrGenerator