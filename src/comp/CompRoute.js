import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './auth/signin/SignIn';
import SignUp from './auth/signUp/SignUp';
import ToDoList from './todo/todo/Todo';

export const AppContext = createContext()

const CompRoute = () => {
 
  let [stateGetList, setGetList] = useState(null);
  const navigate = useNavigate();
  const localStorageToken = window.localStorage.getItem('userToken');
  let location = useLocation();

  useEffect(()=>{ //처음에 들어올때 로컬스토리지에 토큰정보가 있으면 바로 todo로 넘어감
    if (localStorageToken && (location.pathname === '/')) {
      navigate('/todo');
    } else if (!localStorageToken && (location.pathname === '/todo')) {
      alert('로그인 정보가 없으므로 로그인페이지로 이동합니다.');
      window.location.href = '/';
    }
  },[])
  return (
    <AppContext.Provider value={{
        stateGetList, setGetList
    }}>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/todo' element={<ToDoList />}></Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default CompRoute;