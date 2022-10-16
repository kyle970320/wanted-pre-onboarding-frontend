import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../CompRoute';
import { getTodos } from '../../../store/fetchApi';
import TodoAdd from '../todoAdd/TodoAdd';
import TodoListItem from '../todoListItem/TodoListItem';
import style from './todo.module.css'

const CompToDoList = () => {
  const localStorageToken = window.localStorage.getItem('userToken');
  let { stateGetList, setGetList } = useContext(AppContext)
  const navigate = useNavigate()

    /* 로그아웃 구현 */
  const signOutHandler = () => {
    window.localStorage.removeItem('userToken');
    alert('정상적으로 로그아웃 되었습니다');
    navigate('/')
  }

    /* 비동기 처리를 위해 useEffect 안에서 함수 선언 후 바로 호출 */
  useEffect(() => {
    const getList = async (token) => {
      let listItem = await getTodos(token);
      setGetList(listItem);
    }
    getList(localStorageToken)
  }, []);

  return (
    <div className={style.todo}>
      <p>
        <button className={style.signOut} onClick={signOutHandler}>
        <img className={style.line} src={`${process.env.PUBLIC_URL}/img/btn-sign-out.png`} alt="" />
        </button>
      </p>
      <p>
        <TodoAdd />
      </p>
      <img className={style.line} src={`${process.env.PUBLIC_URL}/img/line-dashed.png`} alt="" />
      <ul>
        {
          stateGetList && stateGetList.map((data) => {
            return (
              <TodoListItem data={data} key={data.id} />
            )
          })
        }
      </ul>
      <span className={style.box}><b></b>:완료 / <i></i>:미완료</span>
    </div>
  );
};

export default CompToDoList;