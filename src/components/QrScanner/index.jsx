import axios from 'axios'
import React, { useState, useEffect } from 'react'
import QrReader from 'react-qr-reader'
import PropTypes from 'prop-types'
import StyledQrScan from './style'
import CourseDataService from '../../services/CourseService'
import QrService from '../../services/QrServices'

function QrScanner(props) {
  QrScanner.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    }),
  }

  const { match } = props

  const initialCourseState = {
    courseId: null,
    name: '',
    description: '',
  }

  const initialQrState = {
    memberId: '',
    validNum: '',
    courseDateId: '',
  }

  const [info, setInfo] = useState(initialQrState)
  const [result, setResult] = useState(false)
  const [error, setError] = useState(null)
  const [text, setText] = useState('인증 정보가 잘못되었습니다.')
  const [currentCourse, setCurrentCourse] = useState(initialCourseState) // 현재 강좌 정보 저장

  const getCourse = id => {
    // 현재 강좌를 찾는 함수
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(match.params.id)
  }, [match.params.id])

  useEffect(() => {
    const valid = () => {
      if (result === false) {
        setText('인증 정보가 잘못되었습니다.')
      } else {
        setText('인증이 완료되었습니다.')
      }
    }
    valid()
  }, [])

  const sendInfo = async () => {
    try {
      setError(null)
      const res = await QrService.patch(info)
      console.log(res.data.data)
    } catch (e) {
      setError(e)
    }
  }

  const getInfo = async () => {
    try {
      setError(null)
      const response = await QrService.get(currentCourse.courseId)
      console.log(response.data.data)
    } catch (e) {
      setError(e)
    }
  }

  const handleScan = data => {
    if (data) {
      setInfo(JSON.parse(data))
      console.log(info)
      sendInfo()
      getInfo()
    }
  }

  const handleError = err => {
    console.error(err)
  }

  if (error) return <div>에러가 발생했습니다.</div>
  return (
    <StyledQrScan>
      <div className="box">
        <div className="desc">
          <p className="info">"{currentCourse.name}"과목 출석체크</p>
        </div>
        {/* <div className="qrscan"> */}
        <QrReader
          className="scan"
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ alignItems: 'center', width: '80%' }}
        />
        {/* </div> */}
        <div className="desc">
          <p className="info">QR 코드를 스캐너에 찍어주세요.</p>
        </div>
        <p>{result}</p>
      </div>
    </StyledQrScan>
  )
}

export default QrScanner
