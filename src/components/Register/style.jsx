import styled from 'styled-components'
import { Form, } from 'antd';
import 'antd/dist/antd.css';

const Register = styled(Form)`
  > div {
    margin: 1.3rem 1.3rem;
  }

  > div:not(:last-child) {
    position: relative; // 버튼 박스만 제외하고
  }

  > div > label {
    display: inline;
    padding-bottom: 8px;
  }
`;

export default Register