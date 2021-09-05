import * as yup from 'yup'

export const addschema = yup.object({
  name: yup
    .string()
    .required('이름을 입력해주세요.')
    .max(20, '이름은 20자리 이하여야 합니다.')
    .min(2, '이름은 2자리 이상이어야 합니다.'),
  description: yup
    .string()
    .required('강좌설명을 입력해주세요.')
    .max(20, '강좌설명은 20자리 이하여야 합니다.')
    .min(2, '강좌설명은 2자리 이상이어야 합니다.'),
})
