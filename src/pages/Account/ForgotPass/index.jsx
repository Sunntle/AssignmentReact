import { InputLabel } from "components/Input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button, FormGroup, Form, Spinner } from "reactstrap";
import { forgotPass } from "services";
function ForgotPass({ toggleTab }) {
  const [notification, SetNotification] = useState(null);
  const [loading, SetLoading] = useState(false);
  const { handleSubmit, control } = useForm();
  const onSubmit = async (data) => {
    SetLoading(true);
    try {
      const res = await forgotPass(data.emailForgot);
      if (res) {
        const message = {
          status: 0,
          message: "A new password has been sent to your email",
        };
        SetNotification(message);
      } else {
        const message = {
          status: 1,
          message: "Something's wrong!",
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
      {notification &&
        (notification.status === 0 ? (
          <p className="text-start text-success my-3">{notification.message}</p>
        ) : (
          <p className="text-start text-danger my-3">{notification.message}</p>
        ))}
      <FormGroup className="d-flex justify-content-between mt-4">
        <Button type="submit" className="btn-dark py-2 px-3">
          {loading ? <Spinner size="sm" /> : "Confirm"}
        </Button>
        <Link onClick={() => toggleTab("1")} className="btn btn-secondary py-2 px-3">
          Back
        </Link>
      </FormGroup>
    </Form>
  );
}

export default ForgotPass;
