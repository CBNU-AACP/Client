import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'

function QrScanner() {
  const [id, setId] = useState('No result')
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null);
  const [isChecked, setChecked] = useState(false);

  const sendInfo = async () => {
    try {
      setError(null);
      axios.patch(
        'http://5ba74d5a0619.ngrok.io/v1',
        {
            mid: id,
            isChecked: isChecked
        }
      );
    } catch (e) {
      setError(e);
    }
  };

  const getInfo = async () => {
    try {
      setError(null);
      const response = axios.get(
        'http://5ba74d5a0619.ngrok.io/v1',
      );
      console.log(response.success)
      setResult(response.success)
    } catch (e) {
      setError(e);
    }
  };

  const handleScan = (data) => {
    if (data) {
        setId(data.mid)
        setChecked(true)
        console.log(id,isChecked)
        sendInfo()
        getInfo()
      }
  }

  const handleError = (err) => {
    console.error(err)
  }

  if (error) return <div>에러가 발생했습니다.</div>;
  return (
    <div>
     <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ alignItems: 'center', width: '20%' }}
     />
     <p>{result}</p>
    </div>
  )
}

export default QrScanner