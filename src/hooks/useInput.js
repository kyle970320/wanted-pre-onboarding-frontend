import {useState} from "react";

const useInput = (value) => {//input내용 받아오기 함수
  const [stateInput, setInput] = useState(value || "");
  const onChange = (e) => {
    setInput(e.target.value);
  };

  return { stateInput, onChange };
}
export {useInput};
