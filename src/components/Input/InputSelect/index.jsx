import React, { useEffect } from "react";
import { FormFeedback, Label } from "reactstrap";
import Select from "react-select";
function InputSelect(props) {
  const { id, options, name, onBlur, onChange, label, placeholder, inputRef, error } = props;
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={id}
        options={options}
        defaultValue={options[0]}
        onChange={(value) => onChange(value)}
        onBlur={(data) => onBlur(data)}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "#5b2434",
          },
        })}
        placeholder={placeholder}
        className={!!error ? "is-invalid" : ""}
        ref={inputRef}
      ></Select>
      {error !== undefined && <FormFeedback>Oh noes! You must select one {name} </FormFeedback>}
    </>
  );
}

export default InputSelect;