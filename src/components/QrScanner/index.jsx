import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import StyledQrScan from './style'

function QrScanner() {
  const [id, setId] = useState('No result')
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);

  const sendInfo = async () => {
    try {
      setError(null);
      await axios.patch(
        'http://5ba74d5a0619.ngrok.io/v1',
        `{
            "UserName": "${id}",
            "ValidNum": "${isChecked}"
        }`
      );
    } catch (e) {
      setError(e);
    }
  };

  const getInfo = async () => {
    try {
      setError(null);
      const response = await axios.get(
        'http://5ba74d5a0619.ngrok.io/v1',
      );
      console.log(response.data.ValidNum)
      if(response.data.ValidNum===isChecked){
        setResult(true)
      }
      else{
        setResult(false)
      }
    } catch (e) {
      setError(e);
    }
  };
  
  const handleScan = async (data) => {
    if (data) {
      setId(JSON.parse(data).UserName)
      setChecked(JSON.parse(data).ValidNum)
      console.log(id,isChecked)
      sendInfo()
      getInfo()
    }
  }

  const handleError = (err) => {
    console.error(err)
  }

  if (error) setResult(error);
  return (
    <StyledQrScan>
      <div className="box">
        {/* <div className="qrscan"> */}
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ alignItems: 'center', width: '80%' }}/>
        {/* </div> */}
        <div className="desc">
          <p className="info">{`QR 코드를 스캐너에 찍어주세요.`}</p>
        </div>
        <p>{result}</p>
      </div>
    </StyledQrScan>
  )
}

export default QrScanner