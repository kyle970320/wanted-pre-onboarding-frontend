import React ,{ useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../CompRoute';
import { getTodos, updateTodo } from '../../../store/fetchApi';
import {useInput} from '../../../hooks/useInput';
import style from './todoUpdate.module.css'
 
const CompUpdate = ({id, stateCompleted ,todo, setUpdate, setCompleted}) => {
  const localStorageToken = window.localStorage.getItem('userToken');
  const {stateInput: todoText, onChange : textChange} = useInput(todo);
  
  let {setGetList} = useContext(AppContext);
  let navigate = useNavigate()
  const updateHandler = async()=>{ 
    await updateTodo(localStorageToken, id, todoText, stateCompleted);
    let allList = await getTodos(localStorageToken);
    setGetList(allList);
    setUpdate(false)
    navigate('/todo');
  }

  const cancelHandler = ()=>{
    setUpdate(false);
  }

  return (
    <p className={`${style.update} ${style.fade}`}>
      <label htmlFor="update-list">수정내용</label>
      <input type="text" id='update-list' value={todoText} onChange={textChange}/>
      <button onClick={updateHandler}>수정하기</button>
      <button onClick={cancelHandler}>취소하기</button>
    </p>
  );
};

export default CompUpdate;