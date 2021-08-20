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

  const getInfo = async () => {
    try {
      setError(null)
      const response = await QrService.get(currentCourse.courseId)
      console.log(response.data.data)
      setCourseDateId(response.data.data)
    } catch (e) {
      setError(e)
    }
  }

  const sendInfo = async () => {
    try {
      setError(null)
      const res = await QrService.patch({ ...info, courseDateId })
      console.log(res.data)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    // router의 params가 바뀌면 실행
    getCourse(match.params.id)
    if (currentCourse.courseId !== null) getInfo()
  }, [match.params.id])

  useEffect(() => {
    console.log(info)
    if (info.userId !== '' && courseDateId !== '') sendInfo()
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
          {/* <p>{result}</p> */}
        </div>
      ) : (
        <div className="box">출석 리더기 준비 중..</div>
      )}
    </StyledQrScan>
  )
}

export default QrScanner
