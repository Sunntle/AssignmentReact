import { InputLabel } from "components/Input";
import moment from "moment";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, FormGroup, Form } from "reactstrap";
import { showToast } from "redux/toast/toastSlice";
import { loginSuccess } from "redux/user/userSlice";
import { callLogin } from "services";
function LoginComponent({ toggleTab }) {
  const [error, SetError] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit, control } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const onSubmitLogin = async (data) => {
    const d = await callLogin(data);
    if (d) {
      localStorage.setItem("idToken", d.idToken);
      const expiresAt = moment().add(d.expiresIn, "second");
      localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
      localStorage.setItem("role", JSON.stringify(d.data.role));
      dispatch(loginSuccess(d.data));
      navigate(from, { replace: true });
      dispatch(showToast({ type: "success", message: "Login successfully" }));
    } else {
      SetError(true);
    }
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
      {error && <p className="text-danger text-start">Wrong username or password</p>}
      <FormGroup>
        <Button type="submit" className="btn-dark py-2 px-3">
          Login
        </Button>
      </FormGroup>
    </Form>
  );
}

export default LoginComponent;
