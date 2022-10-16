import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../CompRoute';
import { deleteTodo, getTodos } from '../../store/fetchApi';
import TodoUpdate from './TodoUpdate';

const CompList = ({data}) => {
  const localStorageToken = window.localStorage.getItem('userToken');
  let { setGetList} = useContext(AppContext);
  let [stateUpdate, setUpdate] = useState(false);
  let {id, isCompleted, todo, userId} = data;
  const deleteHandler = async ()=>{
  await deleteTodo(localStorageToken, id);
  let allList = await getTodos(localStorageToken);
  setGetList(allList);
  }

  const updateHandler = ()=>{
    setUpdate(true)
  }

  return (
    <li>
      <p>
        <input type={`checkbox`}/>
      </p>
      <p>
        {todo}
      </p>
      <div>
        <button onClick={deleteHandler}>삭제하기</button>
        <button onClick={updateHandler}>수정하기</button>
        {stateUpdate&&<TodoUpdate id={id} isCompleted={isCompleted} todo={todo} setUpdate={setUpdate}/>}
      </div>
    </li>
  );
};

export default CompList;