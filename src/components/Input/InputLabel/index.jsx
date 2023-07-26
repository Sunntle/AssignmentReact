import React from "react";
import { FormFeedback, Input, Label } from "reactstrap";
import "./InputLabelStyle.scss";
function InputLabel(props) {
  const {
    id,
    value,
    name,
    type = "text",
    onBlur,
    onChange,
    label,
    placeholder,
    inputRef,
    error,
    data,
    isMulti,
  } = props;
  return (
    <>
      {label && <Label for={name}>{label}</Label>}
      <Input
        id={id}
        name={name}
        type={type}
        value={isMulti ? undefined : value ?? data}
        placeholder={placeholder}
        onChange={(e) => {
          if (type === "file" && isMulti) {
            const file = Array.from(e.target.files);
            onChange(file);
          } else {
            onChange(e.target.value);
          }
        }}
        onBlur={onBlur}
        invalid={!!error}
        ref={inputRef}
        multiple={isMulti}
      ></Input>
      {error !== undefined && (
        <FormFeedback>{error.message ? error.message : `Oh noes! You must fill ${name} in this input`}</FormFeedback>
      )}
    </>
  );
}

export default InputLabel;
