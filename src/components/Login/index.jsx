import axios from 'axios'
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom'
import StyedLogin from './style'

export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  var login;
  const sendInfo = async (data)=>{
    try {
        setError(null);
        const response = await axios.post(
          'http://localhost:3001/v1/users/login',
          {data}
        );
        login = response.data
      } catch (e) {
        setError(e);
      }
  }


  const onSubmit = (data) => {
      sendInfo(data);
  }

  console.log(watch("example"));

  return (
    <StyedLogin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>로그인</label>
        <input type="text" placeholder="아이디" {...register("userId")} />
        {errors.id && <span>아이디를 입력해주세요.</span>}
        <input type="password" placeholder="비밀번호" {...register("userPassword", { required: true })} />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        {login==="success"?(<Link to="/QrGen"><input type="submit" value="로그인"/></Link>)
             : (<input type="submit" value="로그인"/>)
        }
      </form>
    </StyedLogin>
  );
}