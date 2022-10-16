import React from 'react';
import { useContext } from 'react';
import { AppContext } from '../CompRoute';
import { createTodo, getTodos } from '../../store/fetchApi';

const CompAdd = () => {
  let {setGetList} = useContext(AppContext);
  const localStorageToken = window.localStorage.getItem('userToken');
  const addListHandler = async()=>{
    let whatTodo = document.querySelector('#add-list-btn').value;
    await createTodo(localStorageToken,whatTodo)
    let allList = await getTodos(localStorageToken)
    setGetList(allList)
  }
  return (
    <div>
      <label htmlFor="add-list-btn">추가할 내용</label>
      <input type="text" id='add-list-btn' />
      <button onClick={addListHandler}>추가하기</button>
    </div>
  );
};

export default CompAdd;