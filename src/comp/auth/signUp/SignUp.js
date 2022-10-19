import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignUp } from '../../../store/fetchApi';
import { emailRegExp, passwordRegExp } from '../../hooks/regExp';
import style from '../signin/signIn.module.css'

const CompSignUp = () => {
  const navigate = useNavigate();
  const [stateDisabled, setDisabled] = useState('');
  const [stateEmailError, setEmailError] = useState(null);
  const [statePasswordError, setPasswordError] = useState(null);
  const signUpEmail = useRef();
  const signUpPassword = useRef();

    /* 유효성검사 */
  const fnGetUserLogin = () => {
    if ((emailRegExp.test(signUpEmail.current.value)) && passwordRegExp.test(signUpPassword.current.value)) {
      setDisabled('abled');
    } else {
      setDisabled('');
    }
    !(emailRegExp.test(signUpEmail.current.value))&&(Boolean(signUpEmail.current.value)!=false) ? 
    setEmailError('유효하지 않은 이메일입니다.') : setEmailError(null);
    !(passwordRegExp.test(signUpPassword.current.value))&&(Boolean(signUpPassword.current.value)!=false) ? 
    setPasswordError('유효하지 않은 비밀번호입니다.') : setPasswordError(null);
  }

    /* 회원가입 결과에 따른 라우팅처리 */
  const SignUpHandler = async(e)=>{
    e.preventDefault();
    let SignUpInfo = await SignUp(signUpEmail.current.value, signUpPassword.current.value)
    if(SignUpInfo){
      navigate('/');
    }else{ //잘못된 정보를 입력했을때, 다시 입력할 수 있게 입력창을 비워줌
      signUpEmail.current.value = '';
      signUpPassword.current.value = '';
    }
  }

  const backToSignInHandler = (e)=>{
    e.preventDefault();
    navigate('/');
  }
  return (
    <form className={style.form}>
      <h2 className={style.title}>
        <img src={`${process.env.PUBLIC_URL}/img/register.png`} alt="" />
      </h2>
      <p>
        <label htmlFor='signUp-email'>이메일</label>
        <input id='signUp-email' type="email" ref={signUpEmail} onChange={fnGetUserLogin}/>
      </p>
      <p className={style.errorMessage}>
        {
          stateEmailError &&
          stateEmailError
        }
      </p>
      <p>
        <label htmlFor='signUp-password'>비밀번호</label>
        <input id='signUp-password' type="password" ref={signUpPassword} onChange={fnGetUserLogin}/>
      </p>
      <p className={style.errorMessage}>
        {
          statePasswordError &&
          statePasswordError
        }
      </p>
      <p className={style.btn}>
      <button onClick={backToSignInHandler}>로그인화면 다시가기</button>
      <button disabled={!stateDisabled} onClick={SignUpHandler}>회원가입하기</button>
      </p>
    </form>
  );
};

export default CompSignUp;