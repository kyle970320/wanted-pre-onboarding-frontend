import React, { useRef, useState, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../CompRoute';
import { getTodos, SignIn } from '../../../store/fetchApi';
import style from './signIn.module.css'
import { emailRegExp, passwordRegExp } from '../../../hooks/regExp';

const CompSignIn = () => {
  const { setGetList } = useContext(AppContext);
  const navigate = useNavigate();
  const [stateDisabled, setDisabled] = useState('');
  const [stateEmailError, setEmailError] = useState(null);
  const [statePasswordError, setPasswordError] = useState(null);
  const localStorageToken = window.localStorage.getItem('userToken');
  let location = useLocation();
  let userEmail = useRef();
  let userPassword = useRef();

  useEffect(() => {//로그인 후 곧바로 뒤로가기 하면 뒤로가지는 것을 막는 로직
    if (localStorageToken && (location.pathname === '/')) {
      alert('로그인 정보가 감지되었습니다\n todolist로 이동합니다.');
      navigate('/todo');
    }
  }, [])

  /* 유효성검사(아이디는 @ 이후 문자하나.문자두개 형식으로 검사를 실시)*/
  const fnGetUserLogin = () => {
    if ((emailRegExp.test(userEmail.current.value)) && passwordRegExp.test(userPassword.current.value)) {
      setDisabled('abled');
    } else {
      setDisabled('');
    }
    !(emailRegExp.test(userEmail.current.value))&&(Boolean(userEmail.current.value)!=false) ? 
    setEmailError('유효하지 않은 이메일입니다.') : setEmailError(null);
    !(passwordRegExp.test(userPassword.current.value))&&(Boolean(userPassword.current.value)!=false) ? 
    setPasswordError('유효하지 않은 비밀번호입니다.') : setPasswordError(null);
  }

  const SignInHandler = async (e) => {
    e.preventDefault();
    let token = await SignIn(userEmail.current.value, userPassword.current.value)
    setDisabled(''); //버튼을 잠궈줌

    const getList = async (token) => {
      let listItem = await getTodos(token);
      setGetList(listItem);
    }
    getList(token);
    
    if (token) {
      navigate('/todo');
    } else {
      userEmail.current.value = '';
      userPassword.current.value = '';
    }
  }

  const AuthHandler = (e) => {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <form className={style.form}>
      <h2 className={style.title}>
        <img src={`${process.env.PUBLIC_URL}/img/title.png`} alt="" />
      </h2>
      <p>
        <label htmlFor='user-email'>이메일</label>
        <input id='user-email' type="email" ref={userEmail} onChange={fnGetUserLogin} />
      </p>
        <p className={style.errorMessage}>
          {
            stateEmailError &&
            stateEmailError
          }
        </p>
      <p>
        <label htmlFor='user-password'>비밀번호</label>
        <input id='user-password' type="password" ref={userPassword} onChange={fnGetUserLogin} />
      </p>
        <p className={style.errorMessage}>
          {
            statePasswordError &&
            statePasswordError
          }
        </p>
      <p className={style.btn}>
        <button className='login-btn' onClick={SignInHandler} disabled={!stateDisabled}>로그인</button>
        <button onClick={AuthHandler}>회원가입</button>
      </p>
    </form>
  );
};

export default CompSignIn;