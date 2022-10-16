import {useState} from "react";

const useInput = (value) => {
  const [stateInput, setInput] = useState(value || "");
  const onChange = (e) => {
    setInput(e.target.value);
  };

  return { stateInput, onChange };
}
export {useInput};
