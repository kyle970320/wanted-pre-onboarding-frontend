import React, { useContext, useRef } from 'react';
import { AppContext } from '../../CompRoute';
import { createTodo, getTodos } from '../../../store/fetchApi';
import style from '../todo/todo.module.css'

const CompAdd = () => {
  let { setGetList } = useContext(AppContext);
  let addInput = useRef();

  const localStorageToken = window.localStorage.getItem('userToken');

    /* 추가 함수 */
  const addListHandler = async () => {
    await createTodo(localStorageToken, addInput.current.value)
    let allList = await getTodos(localStorageToken)
    setGetList(allList)
    addInput.current.value = '';
  }

  return (
    <div className={style.addInput}>
      <label htmlFor="add-list-btn">추가할 내용</label>
      <input type="text" id='add-list-btn' ref={addInput} />
      <button onClick={addListHandler}>추가하기</button>
    </div>
  );
};

export default CompAdd;