import React from 'react';
import StyedRegister from './style'
import { Button, Checkbox, Input } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './yup';
import FormErrorMessage from './FormErrorMessage';

function RegisterForm() {
  const { handleSubmit, formState: {errors}, control } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <StyedRegister onFinish={onSubmit} size="large">
      <div>
        <label htmlFor="userId">아이디</label>
        <Controller
          name="userId"
          control={control}
          placeholder="아이디를 입력해주세요."
          defaultValue=""
          render={({field})=><Input type="text" {...field}/>}
        />
        {errors.userId && (
          <FormErrorMessage Message={errors.userId.message} />
        )}
      </div>
      <div>
        <label htmlFor="userName">이름</label>
        <Controller
          name="userName"
          control={control}
          placeholder="이름을 정확하게 입력해주세요."
          defaultValue=""
          render={({field})=><Input type="text" {...field}/>}
        />
        {errors.userName && (
          <FormErrorMessage Message={errors.userName.message} />
        )}
      </div>
      <div>
        <label htmlFor="tel">이름</label>
        <Controller
          name="tel"
          control={control}
          placeholder="전화번호을 정확하게 입력해주세요."
          defaultValue=""
          render={({field: { onChange, value } }) => (
            <Checkbox
              onChange={e => onChange(e.target.checked)}
              checked={value}
            >회원님의 개인정보가 활용됩니다. 약관에 동의합니다.
            </Checkbox>
          )}
        />
        {errors.userName && (
          <FormErrorMessage Message={errors.userName.message} />
        )}
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <Controller
          name="password"
          control={control}
          placeholder="비밀번호를 입력해주세요."
          defaultValue=""
          render={({field})=><Input type="password" {...field}/>}
        />
        {errors.password && (
          <FormErrorMessage Message={errors.password.message} />
        )}
      </div>
      <div>
        <label htmlFor="password2">비밀번호 확인</label>
        <Controller
          name="password2"
          control={control}
          placeholder="비밀번호를 확인해주세요."
          defaultValue=""
          render={({field})=><Input type="password" {...field}/>}
        />
        {errors.password2 && (
          <FormErrorMessage Message={errors.password2.message} />
        )}
      </div>
      <div>
        <Controller
          name="term"
          control={control}
          defaultValue={false}
          render={({field: { onChange, value } }) => (
            <Checkbox
              onChange={e => onChange(e.target.checked)}
              checked={value}
            >회원님의 개인정보가 활용됩니다. 약관에 동의합니다.
            </Checkbox>
          )}
        />
        {errors.term && <FormErrorMessage Message={errors.term.message} />}
      </div>
      <div>
        <Button type="primary" htmlType="submit" block>
          회원가입
        </Button>
      </div>
    </StyedRegister>
  );
}

export default RegisterForm;