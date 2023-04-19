import React, { useState } from "react";
import { InputGroup, NotButton, Input, LabelInput, CloseEyeIcon, OpenEyeIcon } from './Elements'

function PasswordInput({
    label,
    name,
    id,
}) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleClick = (e) => {
    setPassword(e.target.value);
    console.log(password);
    console.log(e.target.value);
  }

  return (
    <InputGroup>        
      
      <div>
        <Input
        required
            name={name}
            id={id}
            isWithButton
          value={password}
          type={visible ? "text" : "password"}
          onChange={(e) => setPassword(e.target.value)}
        ></Input>
        <LabelInput htmlFor={id}>{label}</LabelInput>
        <NotButton onClick={() => setVisible(!visible)}>
            {visible ? <CloseEyeIcon /> : <OpenEyeIcon />}
        </NotButton>
      </div>
      
    </InputGroup>
  )
};
export default PasswordInput;
