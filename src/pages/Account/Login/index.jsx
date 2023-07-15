import { InputLabel } from "components/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, FormGroup, Form } from "reactstrap";

function LoginComponent({ toggleTab }) {
  const { handleSubmit, control } = useForm();
  const onSubmitLogin = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmitLogin)}>
      <FormGroup className="text-start">
        <Controller
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <InputLabel
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
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
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
        <Link onClick={() => toggleTab("3")} className="text-decoration-none">
          Forgot password?
        </Link>
      </FormGroup>
      <FormGroup>
        <Button type="submit" className="btn-dark py-2 px-3">
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}

export default LoginComponent;
