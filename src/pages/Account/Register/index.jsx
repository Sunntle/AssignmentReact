import { InputLabel } from "components/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, FormGroup } from "reactstrap";

function Register() {
  const { handleSubmit: handleSubmit2, control: control2 } = useForm();
  const onSubmitRegister = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit2(onSubmitRegister)}>
      <FormGroup className="text-start">
        <Controller
          name="usernameRegister"
          control={control2}
          defaultValue=""
          rules={{ required: "Please enter a username" }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <InputLabel
              id={name}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              placeholder="Username"
              inputRef={ref}
              error={error}
            />
          )}
        />
      </FormGroup>
      <FormGroup className="text-start">
        <Controller
          name="passwordRegister"
          control={control2}
          defaultValue=""
          rules={{ required: "Please enter your password" }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <InputLabel
              id={name}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              type="password"
              placeholder="Password"
              inputRef={ref}
              error={error}
            />
          )}
        />
      </FormGroup>
      <FormGroup className="text-start">
        <Controller
          name="email"
          control={control2}
          defaultValue=""
          rules={{
            required: "Please enter your email",
            pattern: {
              value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
              message: "Please enter a correct email format",
            },
          }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <InputLabel
              id={name}
              name={name}
              onBlur={onBlur}
              onChange={onChange}
              type="email"
              placeholder="Email"
              inputRef={ref}
              error={error}
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Button type="submit" color="dark" className="py-2 px-3">
          Register
        </Button>
      </FormGroup>
    </Form>
  );
}

export default Register;
