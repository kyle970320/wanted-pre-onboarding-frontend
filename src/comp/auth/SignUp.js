import React from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../store/fetchApi';

const CompSignUp = () => {
  const navigate = useNavigate()
  const signUpEmail = useRef();
  const signUpPassword = useRef();
  const SignUpHandler = async(e)=>{
    e.preventDefault();
    let SignUpInfo = await SignUp(signUpEmail.current.value, signUpPassword.current.value)
    console.log(SignUpInfo)
    if(SignUpInfo){
      navigate('/')
    }else{
      signUpEmail.current.value = '';
      signUpPassword.current.value = '';
    }
  }
  return (
    <form>
      <p>
        <label htmlFor='signUp-email'>이메일</label>
        <input id='signUp-email' type="email" ref={signUpEmail}/>
      </p>
      <p>
        <label htmlFor='signUp-password'>비밀번호</label>
        <input id='signUp-password' type="password" ref={signUpPassword}/>
      </p>
      <button onClick={SignUpHandler}>회원가입하기</button>
    </form>
  );
};

export default CompSignUp;