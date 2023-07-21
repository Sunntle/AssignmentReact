import { InputLabel } from "components/Input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, FormGroup, Spinner } from "reactstrap";
import { registerUser } from "services";

function Register() {
  const { handleSubmit: handleSubmit2, control: control2, reset } = useForm();
  const [loading, SetLoading] = useState(false);
  const [notification, SetNotification] = useState(null);
  const onSubmitRegister = async (data) => {
    SetLoading(true);
    try {
      const userInfo = {
        username: data.usernameRegister,
        password: data.passwordRegister,
        email: data.email,
      };
      const res = await registerUser(userInfo);
      if (res) {
        const message = {
          status: 0,
          message: "Register successfully",
        };
        SetNotification(message);
        reset();
      } else {
        const message = {
          status: 1,
          message: "Username already used",
        };
        SetNotification(message);
      }
    } catch (error) {
      console.error(error);
      const message = {
        status: 1,
        message: "An error occurred!",
      };
      SetNotification(message);
    } finally {
      SetLoading(false);
    }
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
              data={value}
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
              data={value}
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
              data={value}
            />
          )}
        />
      </FormGroup>
      {notification &&
        (notification.status === 0 ? (
          <p className="text-start text-success my-3">{notification.message}</p>
        ) : (
          <p className="text-start text-danger my-3">{notification.message}</p>
        ))}
      <FormGroup>
        <Button type="submit" color="dark" className="py-2 px-3">
          {loading ? <Spinner size="sm" /> : "Register"}
        </Button>
      </FormGroup>
    </Form>
  );
}

export default Register;
