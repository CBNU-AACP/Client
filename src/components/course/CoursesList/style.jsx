import styled from 'styled-components'

const CoursesList = styled.div`
  width: 100%;
  margin-top: 2rem;
  .container {
    width: 100%;
    .searchset {
      margin: auto;
      width: 200px;
      background-color: #dcdcdc;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      border-radius: 10px;
      display: flex;
      .searchtext {
        margin: 0;
        padding: auto;
        font-size: 0.8rem;
        background-color: #dcdcdc;
        border-radius: 6px;
        border: none;
      }
      .search {
        padding: auto;
        margin: auto;
        font-size: 1.3rem;
        .icon {
          vertical-align: middle;
        }
      }
      .search:active {
        color: orange;
      }
    }
    .set {
      display: flex;
      .left {
        margin: 2rem 1rem;
        max-width: 400px;
        width: 100%;
        .courseTitle {
          margin: 0.5rem auto;
          .icon {
            margin: 0 0.1rem 0 0;
            vertical-align: middle;
            font-size: 1.3rem;
          }
          .listtitle {
            display: inline;
            font-size: 0.9rem;
          }
        }
        .list {
          height: 600px;
          .item {
            width: 150px;
            height: 20px;
            margin: 0.2rem auto;
            list-style: none;
            background-color: #dcdcdc;
            box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            border-radius: 4px;
            .liText {
              font-size: 0.9rem;
              font-weight: bold;
            }
          }
          .active {
            background-color: orange;
          }
        }
        .delete {
          position: fixed;
          bottom: 10%;
          right: 10%;
          padding: 0.4rem 0.5rem;
          text-align: center;
          border-radius: 10px;
          background-color: white;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          font-size: 1.6rem;
          .deleteText {
            font-size: 0.7rem;
          }
        }
        .delete:hover {
          color: white;
          background-color: red;
        }
      }
      .right {
        margin: 2rem 1rem;
        max-width: 400px;
        width: 100%;
        .courseData {
          text-align: left;
          font-size: 0.9rem;
          margin: 0.5rem 0;
          .course {
            font-weight: bold;
            font-size: 0.9rem;
            margin: 0.5rem 0;
          }
          .iconlist {
            display: flex;
            flex-wrap: wrap;
            width: 150px;
            margin: 0;
            .icons {
              padding: 0.5rem 0.3rem;
              width: 50px;
              height: 50px;
              text-align: center;
              margin: 0 0.5rem 0.5rem 0;
              background-color: white;
              box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
              border-radius: 10px;
              .icon {
                font-size: 1.3rem;
              }
              .text {
                font-size: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
`

export default CoursesList
