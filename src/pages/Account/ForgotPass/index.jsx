import { InputLabel } from "components/Input";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, FormGroup, Form } from "reactstrap";
function ForgotPass({ toggleTab }) {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup className="text-start">
        <Controller
          name="emailForgot"
          control={control}
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
      <FormGroup className="d-flex justify-content-between pt-4">
        <Button type="submit" className="btn-dark py-2 px-3">
          Confirm
        </Button>
        <Link onClick={() => toggleTab("1")} className="btn btn-secondary py-2 px-3">
          Back
        </Link>
      </FormGroup>
    </Form>
  );
}

export default ForgotPass;
