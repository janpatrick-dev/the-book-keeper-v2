import { useState } from "react"

const useCheckbox = (defaultValue=false) => {
  const [value, setValue] = useState(defaultValue);
  
  const onChange = (e) => {
    setValue(e.target.checked);
  }

  return {
    type: 'checkbox',
    checked: value,
    value,
    onChange
  }
};

export default useCheckbox;