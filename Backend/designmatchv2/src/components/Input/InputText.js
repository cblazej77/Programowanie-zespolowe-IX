import React, { useState } from "react";
import { InputGroup,  Input, LabelInput } from './Elements'

function InputText({
    label,
    name,
    id
}) {
    const [email, setEmail] = useState("");
    const handleClick = (e) => {
        setEmail(e.target.value);
        console.log(email);
        console.log(e.target.value);
    } 

  return (
    <InputGroup>        
        <Input
            required
            name={name}
            value={email}
            id={id}
            type="text"
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <LabelInput htmlFor={id}>{label}</LabelInput>
    </InputGroup>
  )
};
export default InputText;
