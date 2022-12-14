# wanted-pre-onboarding-frontend
:blush:원티드 프리온보딩 프론트엔드 사전과제

해당 레파지토리는 프리온보딩 프론트엔드 코스 사전과제 제출용입니다.

## 프로젝트 실행 방법
```
npm install
npm start
```

## 데모영상
코드 데모버전은 영상대신 링크로 제출하겠습니다.

[:eyes:데모링크](https://main--vocal-puffpuff-82abf9.netlify.app/)
[:full_moon_with_face:블로그 링크](https://blog.naver.com/zkdlf97/222902018550)

## 구현 요구 기능과 구현 여부

#### -로그인/회원가입-
  - /경로에 로그인 기능 개발 / routing으로 회원가입을 분리하여 /signup 경로에 개발

  - Assignment1 => 이메일과 비밀번호의 유효성 검사기능을 구현
    - 정규표현식을 이용하여 이메일과 비밀번호의 유효성 검사 완료
    - :bulb: 회원가입/로그인 폼 모두 유효성 검사에 통과하지 못하면 아래에 에러메세지 호출

  - Assignment2 => 로그인 API를 호출하고, 올바른 응답을 받았을 때 /todo 경로로 이동
    - 로그인 API 연동 완료, 토큰 기록 로컬스토리지에 저장 완료

  - Assignment3 => 로그인 여부에 따른 리다이렉트 처리
    - 토큰 유무에 따라 / 경로나 /todo 경로 로 이동 처리
    - :bulb: 로그인을 한 뒤, 뒤로가기 버튼으로 넘어가면 넘어가지는 현상 수정
---
#### -투두 리스트-
- Assignment4 => /todo 경로에 접속하면 투두 리스트 표시
  - /todo 경로에 접속시 투두 리스트 표시 완료
  - 맨 위에 추가하고 싶은 내용과 추가버튼이 있음
  - 추가 버튼을 누르면 입력창의 내용이 추가됨
  - 리스트로 넘어가면 완료여부/내용/수정버튼/삭제버튼 순으로 목록이 생성되어 나옴
  - :bulb: 추가버튼 오른쪽 부분에 로그인 버튼 구현(실제 로그아웃되며 로그아웃시 강제로 / 경로로 이동)

- Assignment5 => 투두 리스트 수정/ 삭제 기능 구현
  - 목록에 개별적으로 수정/삭제 버튼이 존재함
  - 삭제버튼을 누르면 목록이 사라짐
  - 수정버튼을 누르면 모달형식으로 입력창과 수정하기 / 취소하기 버튼이 나타남
  - 취소하기를 누르면 창이 그냥 닫히고, 수정하기를 누르면 입력창의 내용으로 수정됨
  - 완료 여부는 checkbox로 선택가능
