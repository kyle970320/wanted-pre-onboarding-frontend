import React ,{ useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../CompRoute';
import { getTodos, updateTodo } from '../../store/fetchApi';
import {useInput} from '../hooks/useInput';
 
const CompUpdate = ({id, isCompleted ,todo, setUpdate}) => {
  const localStorageToken = window.localStorage.getItem('userToken');
  const location = useLocation()
  const {stateInput: todoText, onChange : textChange} = useInput(todo)
  let {setGetList} = useContext(AppContext)
  let navigate = useNavigate()

  const updateHandler = async()=>{ 
    let title = document.querySelector('#update-list').value;
    await updateTodo(localStorageToken, id, title, isCompleted);
    let allList = await getTodos(localStorageToken);
    setGetList(allList);
    setUpdate(false)
    navigate('/todolist');
  }

  const cancelHandler = ()=>{
    setUpdate(false);
  }
  return (
    <p>
      <label htmlFor="update-list">수정내용</label>
      <input type="text" id='update-list' value={todoText} onChange={textChange}/>
      <button onClick={updateHandler}>수정하기</button>
      <button onClick={cancelHandler}>취소하기</button>
    </p>
  );
};

export default CompUpdate;