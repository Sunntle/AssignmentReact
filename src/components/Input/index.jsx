import React from "react";
import { Input, Label } from "reactstrap";

function InputForm(props) {
  const { id, value, name, type = "text", onBlur, onChange, label } = props;
  return (
    <>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={onBlur}
      ></Input>
    </>
  );
}

export default InputForm;
