import * as yup from 'yup'

export const schema = yup.object({
  userId: yup
    .string()
    .required('아이디를 입력해주세요.')
    .max(20, '아이디는 20자리 이하여야 합니다.')
    .min(4, '아이디는 4자리 이상이어야 합니다.'),
  name: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(15, '이름은 15자리 이하여야 합니다.')
    .min(2, '이름은 2자리 이상이어야 합니다.'),
  studentId: yup.string().required('학번을 입력해주세요. 학번이 없으시면 "null"을 입력해주세요.'),
  // .typeError('학번을 올바르게 입력해주세요.'),
  userEmail: yup.string().required('이메일을 입력해주세요.').email('잘못된 형식의 이메일입니다.'),
  userPassword: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .max(20, '비밀번호는 20자리 이하여야 합니다.')
    .min(6, '비밀번호는 6자리 이상이어야 합니다.'),
  userPassword2: yup
    .string()
    .required('비밀번호를 확인해주세요.')
    .oneOf([yup.ref('userPassword'), null], '비밀번호가 일치하지 않습니다.'),
  userPhoneNumber: yup.number().required('전화번호를 입력해주세요.').typeError('전화번호를 올바르게 입력해주세요.'),
  userVerifyNum: yup.number().required('인증번호를 입력해주세요.').typeError('인증번호를 올바르게 입력해주세요.'),
  term: yup.boolean().oneOf([true], '약관에 동의해주세요.'),
})
