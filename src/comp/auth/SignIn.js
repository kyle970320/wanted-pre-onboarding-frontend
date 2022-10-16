import React, { useRef } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../CompRoute';
import { getTodos, SignIn } from '../../store/fetchApi';
import style from '../../style/signIn.module.css'

const CompSignIn = () => {
  const {setGetList} = useContext(AppContext)
  const navigate = useNavigate()
  const [stateDisabled, setDisabled] = useState('')
  const localStorageToken = window.localStorage.getItem('userToken');
  let location = useLocation();
  let userEmail = useRef();
  let userPassword = useRef();

  useEffect(()=>{
    if (localStorageToken && (location.pathname === '/')) {
      alert('로그인 정보가 감지되었습니다\n todolist로 이동합니다.')
      navigate('/todolist')
    }
  },[])

  const fnGetUserLogin = () => {
    if((userEmail.current.value.includes('@'))&&(userPassword.current.value.length>=8)){
      setDisabled('abled')
    }else{
      setDisabled('')
    }
  }

  const SignInHandler = async(e)=>{
    e.preventDefault();
    let token = await SignIn(userEmail.current.value, userPassword.current.value)
    // setDisabled('')
    const getList = async(token)=>{
      let listItem = await getTodos(token);
      setGetList(listItem);
    }
    getList(token);
    if(token){
      navigate('/todolist')
    }
  }

  const AuthHandler = (e)=>{
    e.preventDefault();
    navigate('/signup')
  }

  return (
    <form className={`${style.signInForm}`}>
      <p>
        <label htmlFor='user-email'>이메일</label>
        <input id='user-email' type="email" ref={userEmail} onChange={fnGetUserLogin} />
      </p>
      <p>
        <label htmlFor='user-password'>비밀번호</label>
        <input id='user-password' type="password" ref={userPassword} onChange={fnGetUserLogin} />
      </p>
      <button className='login-btn' onClick={SignInHandler} disabled={!stateDisabled}>로그인</button>
      <button onClick={AuthHandler}>회원가입</button>
    </form>
  );
};

export default CompSignIn;