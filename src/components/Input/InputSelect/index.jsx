import Select from "react-select";
import { FormFeedback, Label } from "reactstrap";
function InputSelect(props) {
  const { id, options, name, onBlur, onChange, label, placeholder, inputRef, error, data, isMulti } = props;
  return (
    <>
      {label && <Label for={name}>{label}</Label>}
      <Select
        id={id}
        options={options}
        value={data}
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
        isMulti={isMulti}
      ></Select>
      {error !== undefined && <FormFeedback>Oh noes! You must select one {name} </FormFeedback>}
    </>
  );
}

export default InputSelect;
