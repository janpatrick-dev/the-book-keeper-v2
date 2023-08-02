import { useState } from "react"

const useField = (type, defaultValue='') => {
  const [value, setValue] = useState(defaultValue);
  
  const onChange = (event) => {
    let targetValue = event.target.value;
    setValue(targetValue);
  }

  return {
    type,
    value,
    onChange,
  }
};

export default useField;