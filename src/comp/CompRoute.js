import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import ToDoList from './todo/ToDoList';

export const AppContext = createContext()

const CompRoute = () => {
 
  let [stateGetList, setGetList] = useState(null);
  const navigate = useNavigate();
  const localStorageToken = window.localStorage.getItem('userToken');
  let location = useLocation()
  console.log('my token : ' + localStorageToken)

  useEffect(()=>{
    if (localStorageToken && (location.pathname === '/')) {
      navigate('/todolist')
    } else if (!localStorageToken && (location.pathname === '/todolist')) {
      alert('로그인 정보가 없으므로 로그인페이지로 이동합니다.');
      window.location.href = '/'
    }
  },[])
  return (
    <AppContext.Provider value={{
        stateGetList, setGetList
    }}>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/todolist' element={<ToDoList />}></Route>
      </Routes>
    </AppContext.Provider>
  );
};

export default CompRoute;