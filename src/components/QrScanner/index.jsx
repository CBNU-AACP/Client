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
    userId: '',
    validNum: '',
  }

  const [info, setInfo] = useState(initialQrState)
  const [courseDateId, setCourseDateId] = useState('')
  const [error, setError] = useState(null)
  const [result, setResult] = useState('no')
  const [currentCourse, setCurrentCourse] = useState(initialCourseState) // 현재 강좌 정보 저장

  const getInfo = async courseid => {
    try {
      const response = await QrService.get(courseid)
      console.log(response.data.data[0].courseDateId)
      setCourseDateId(response.data.data[0].courseDateId)
    } catch (e) {
      console.log(e)
    }
  }

  const sendInfo = async () => {
    try {
      console.log({ ...info, courseDateId })
      const res = await QrService.patch({ ...info, courseDateId })
      console.log(res.data)
      setResult('출석되었습니다.')
    } catch (e) {
      setResult('유효하지 않은 QR코드입니다.')
      console.log(e)
    }
  }
  const getCourse = id => {
    // 현재 강좌를 찾는 함수
    CourseDataService.get(id)
      .then(response => {
        setCurrentCourse(response.data.data)
        console.log(response.data.data)
        getInfo(response.data.data.courseId)
      })
      .catch(e => {
        console.log(e)
      })
  }

  useEffect(() => {
    console.log(info)
    console.log(courseDateId)
    if (info.userId !== '' && courseDateId !== '') sendInfo()
    if (info.userId === '' && info.validNum === '') {
      getCourse(match.params.id)
    }
  }, [info])

  const handleScan = data => {
    if (data) {
      setInfo(JSON.parse(data))
    }
  }

  const handleError = err => {
    console.error(err)
  }

  if (error) return <div>에러가 발생했습니다.</div>
  return (
    <StyledQrScan>
      {currentCourse.courseId !== null ? (
        <div className="box">
          <div className="desc">
            <p className="info">"{currentCourse.name}"과목 출석체크</p>
          </div>
          <QrReader
            className="scan"
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ alignItems: 'center', width: '80%' }}
          />
          <div className="desc">
            <p className="info">QR 코드를 스캐너에 찍어주세요.</p>
          </div>
          <p>{result}</p>
        </div>
      ) : (
        <div className="box">출석 리더기 준비 중..</div>
      )}
    </StyledQrScan>
  )
}

export default QrScanner
