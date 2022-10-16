import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../CompRoute';
import { getTodos } from '../../store/fetchApi';
import TodoAdd from './TodoAdd';
import TodoListItem from './TodoListItem';

const CompToDoList = () => {
  const localStorageToken = window.localStorage.getItem('userToken');
  let { stateGetList, setGetList } = useContext(AppContext)
  const navigate = useNavigate()

  const getList = async (token) => {
    let listItem = await getTodos(token);
    console.log("listItem", listItem);
    setGetList(listItem);
  }

  const signOutHandler = () => {
    window.localStorage.removeItem('userToken');
    alert('정상적으로 로그아웃 되었습니다');
    navigate('/')
  }

  useEffect(() => {
    getList(localStorageToken);
  }, []);

  return (
    <div>
      <p>
        <button onClick={signOutHandler}>로그아웃</button>
      </p>
      <TodoAdd />
      <ul>
        {
          stateGetList && stateGetList.map((data) => {
            console.log(data)
            return (
              <TodoListItem data={data} key={data.id} />
            )
          })
        }
      </ul>
    </div>
  );
};

export default CompToDoList;