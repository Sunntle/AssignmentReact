import React from "react";
import { FormFeedback, Input, Label } from "reactstrap";
function InputLabel(props) {
  const { id, value, name, type = "text", onBlur, onChange, label, placeholder, inputRef, error } = props;
  return (
    <>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={onBlur}
        invalid={!!error}
        ref={inputRef}
      ></Input>
      {error !== undefined && (
        <FormFeedback>{error.message ? error.message : `Oh noes! You must fill ${name} in this input`}</FormFeedback>
      )}
    </>
  );
}

export default InputLabel;
