/* 공통URL */
const commonURL = 'https://pre-onboarding-selection-task.shop/';

/*회원가입 함수 */
const SignUp = (email, password) => {
  return new Promise((resolve) => {
    fetch(`${commonURL}auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.access_token) {
          alert('회원가입이 완료되었습니다')
        }
        else {
          alert('이미 존재하는 이메일입니다')
        }
        resolve(response.access_token)
      })
  })
}

/*회원 로그인 함수 */
const SignIn = (email, password) => {
  return new Promise((resolve) => {
    fetch(`${commonURL}auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.access_token) {
          localStorage.setItem('userToken', response.access_token);
          alert('환영합니다! 일정표 작성으로 이동합니다.')
        }
        else {
          alert('잘못된 정보입니다. 다시 입력하세요')
        }
        resolve(response.access_token)
      })
  })
}


/* todolist 가져오기 함수 */
const getTodos = (Token)=>{
  return new Promise((resolve) => {
    fetch(`${commonURL}todos`, {
      headers: {
        Authorization: 'Bearer '+ Token,
      }
    })
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
  })
}

/* todolist 추가 함수 */
const createTodo = (Token, title) => {
  return new Promise((resolve) => {
    fetch(`${commonURL}todos`, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer '+Token,
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        'todo': title,
      })
    }) 
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
  })
}

/* todolist 삭제 함수 */
const deleteTodo = (Token, id) => {
  return new Promise((resolve) => {
    fetch(`${commonURL}todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization:'Bearer '+Token,
      },
    }) 
      .then(response => {
        resolve(response)
      })
  })
}

/* todolist 수정 함수 */
const updateTodo = (Token, id, title, Completed) => {
  return new Promise((resolve) => {
    fetch(`${commonURL}todos/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer '+Token,
        'Content-Type': 'application/json',
      },
      body : JSON.stringify({
        'todo': title,
        'isCompleted' : Completed
      })
    }) 
      .then(response => response.json())
      .then(response => {
        resolve(response)
      })
  })
}
export { SignUp, SignIn, createTodo, getTodos, deleteTodo, updateTodo}