import * as yup from 'yup'

export const schema = yup.object({
  userId: yup
    .string()
    .required('아이디를 입력해주세요.')
    .max(12, '아이디는 12자리 이하여야 합니다.')
    .min(4, '아이디는 4자리 이상이어야 합니다.'),
  userName: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(15, '이름은 15자리 이하여야 합니다.')
    .min(2, '이름은 2자리 이상이어야 합니다.'),
  email: yup.string().required('이메일을 입력해주세요.').email('잘못된 형식의 이메일입니다.'),
  passWord: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(15, '비밀번호는 10자리 이하여야 합니다.')
    .min(4, '비밀번호는 6자리 이상이어야 합니다.'),
  passWord2: yup
    .string()
    .required('비밀번호를 확인해주세요.')
    .oneOf([yup.ref('passWord'), null], '비밀번호가 일치하지 않습니다.'),
  term: yup.boolean().oneOf([true], '약관에 동의해주세요.'),
})
