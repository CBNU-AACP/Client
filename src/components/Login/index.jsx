import axios from 'axios'
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from 'react-router-dom'
import StyedLogin from './style'

export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const [login, setLogin] =useState("");

  const sendInfo = async (data)=>{
    try {
        console.log(data)
        setError(null);
        const response = await axios.post(
          'http://6f30e35bfe80.ngrok.io/v1/users/login',
            data
        );
        console.log(response.data)
        console.log(typeof(login));
        setLogin(response.data.message);
        console.log(login);
      } catch (e) {
        setError(e);
      }
  }


  const onSubmit = (data) => {
      sendInfo(data);
  }


  return (
    <StyedLogin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>로그인</label>
        <input id="id" type="text" placeholder="아이디" {...register("userId", { required: true })} />
        {errors.userId && <span>아이디를 입력해주세요.</span>}
        <input id="password" type="password" placeholder="비밀번호" {...register("userPassword", { required: true })} />
        {errors.userPassword && <span>비밀번호를 입력해주세요.</span>}
        {String(login)==="success"?
            <Link to="/QrGen"><input type="submit" value="로그인"/></Link>
             : <Link to="/QrGen"><input type="submit" value="로그인"/></Link>
        }
      </form>
    </StyedLogin>
  );
}