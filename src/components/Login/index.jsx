import axios from 'axios'
import React, {useState} from "react";
import { useForm } from "react-hook-form";
import StyedLogin from './style'

export default function App() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [error, setError] = useState(null);
  const sendInfo = async (data)=>{
    try {
        setError(null);
        await axios.patch(
          'http://localhost::3001/v1',
          {data}
        );
      } catch (e) {
        setError(e);
      }
  }
  const onSubmit = (data) => {
      console.log(data);
      sendInfo(data);
  }

  console.log(watch("example"));

  return (
    <StyedLogin>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>로그인</label>
        <input type="text" placeholder="아이디" {...register("id")} />
        {errors.id && <span>아이디를 입력해주세요.</span>}
        <input type="password" placeholder="비밀번호" {...register("password", { required: true })} />
        {errors.password && <span>비밀번호를 입력해주세요.</span>}
        <input type="submit" value="로그인"/>
      </form>
    </StyedLogin>
  );
}