import React, { useContext, useState } from 'react';
import { AppContext } from '../../CompRoute';
import { deleteTodo, getTodos, updateTodo } from '../../../store/fetchApi';
import TodoUpdate from '../todoUpdate/TodoUpdate';
import style from './todoListItem.module.css'

const CompList = ({ data }) => {
  const localStorageToken = window.localStorage.getItem('userToken');
  let { id, isCompleted, todo } = data;
  let { setGetList } = useContext(AppContext);
  let [stateUpdate, setUpdate] = useState(false);
  let [stateCompleted, setCompleted] = useState(isCompleted)

  const deleteHandler = async () => {
    await deleteTodo(localStorageToken, id);
    let allList = await getTodos(localStorageToken);
    setGetList(allList);
  }

  const updateHandler = () => {
    setUpdate(true)
  }

  const CheckedHandler = async(e) => {
    setCompleted(e.target.checked);
    await updateTodo(localStorageToken, id, todo, e.target.checked);
    let allList = await getTodos(localStorageToken);
    setGetList(allList);
  }

  return (
    <>
      <li className={style.list}>
        <p>
          <input className={stateCompleted ? style.active : style.nonActive} 
          type={`checkbox`} onChange={CheckedHandler} checked={stateCompleted} />
        </p>
        <p>
          {todo}
        </p>
        <div>
          <button onClick={updateHandler}>수정하기</button>
          <button onClick={deleteHandler}>삭제하기</button>
          {stateUpdate && <TodoUpdate id={id}
            isCompleted={isCompleted}
            todo={todo}
            setUpdate={setUpdate}
            stateCompleted={stateCompleted}
            setCompleted={setCompleted}
          />}
        </div>
      </li>
      <img className={style.line} src={`${process.env.PUBLIC_URL}/img/line-dashed.png`} alt="" />
    </>
  );
};

export default CompList;