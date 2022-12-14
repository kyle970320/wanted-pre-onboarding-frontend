import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../CompRoute';
import { getTodos } from '../../../store/fetchApi';
import TodoAdd from '../todoAdd/TodoAdd';
import TodoListItem from '../todoListItem/TodoListItem';
import style from './todo.module.css'

const CompToDoList = () => {
  const localStorageToken = window.localStorage.getItem('userToken');
  let { stateGetList, setGetList } = useContext(AppContext);
  const navigate = useNavigate();

    /* 로그아웃 구현(로컬스토리지를 삭제한 후, 로그인 페이지로 이동)*/
  const signOutHandler = () => {
    window.localStorage.removeItem('userToken');
    alert('정상적으로 로그아웃 되었습니다');
    navigate('/');
  }

    /* 비동기 처리를 위해 useEffect 안에서 함수 선언 후 바로 호출 */
  useEffect(() => {
    const getList = async (token) => {
      let listItem = await getTodos(token);
      setGetList(listItem);
    }
    getList(localStorageToken);
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
        {//비어있거나 error가 들어온 값(객체로 들어옴)은 map이 실행되지 않음
          Array.isArray(stateGetList) && stateGetList.map((data) => {
            return (
              <TodoListItem data={data} key={data.id} />
            )
          })
        }
      </ul>
      <span className={style.box}><b></b>:완료 / <i></i>:미완료&#40;클릭으로 변경&#41;</span>
    </div>
  );
};

export default CompToDoList;