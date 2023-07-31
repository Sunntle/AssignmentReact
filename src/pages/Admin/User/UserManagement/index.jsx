import { InputLabel, InputSelect } from "components/Input";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";
import { showToast } from "redux/toast/toastSlice";
import { registerUser, updateUser } from "services";

function UserManagement({ modal, data, toggle }) {
  const optionsRole = [
    {
      label: "User",
      value: 0,
    },
    {
      label: "Admin",
      value: 1,
    },
  ];
  const [loading, SetLoading] = useState(false);
  const { handleSubmit, control, setValue } = useForm();
  const dispatch = useDispatch();
  const checkAction = useCallback(() => {
    return Object.keys(data).length > 1;
  }, [data]);
  useEffect(() => {
    if (checkAction()) {
      setValue("name", data.name);
      setValue("username", data.username);
      setValue("email", data.email);
      setValue("role", data.role === 1 ? { value: 1, label: "Admin" } : { value: 0, label: "User" });
      setValue("phone", data.phone);
      setValue("address", data.address);
    } else {
      setValue("name", "");
      setValue("username", "");
      setValue("password", "");
      setValue("email", "");
      setValue("role", "");
      setValue("phone", "");
      setValue("address", "");
    }
  }, [data, setValue, checkAction]);
  const onSubmit = async (dataForm) => {
    SetLoading(true);
    try {
      const { role, ...rest } = dataForm;
      let res;
      if (!checkAction()) {
        res = await registerUser({ ...rest, role: role.value });
      } else {
        res = await updateUser({ ...rest, role: role.value, id: data.id });
      }
      if (res && !res.error) {
        dispatch(
          showToast({ type: "success", message: !checkAction() ? "Register successfully" : "Update successfully" })
        );
        toggle();
      } else if (res && res.error) {
        dispatch(showToast({ type: "danger", message: res.error }));
      }
    } catch (err) {
      console.log(err);
    } finally {
      SetLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Modal scrollable size="lg" keyboard isOpen={modal} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>User Information</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputLabel
                  id={name}
                  name={name}
                  type="text"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Name"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputLabel
                  id={name}
                  name={name}
                  type="text"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Username"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          {!checkAction() && (
            <FormGroup>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <InputLabel
                    id={name}
                    name={name}
                    type="password"
                    onBlur={onBlur}
                    onChange={onChange}
                    label="Password"
                    error={error}
                    value={value}
                    inputRef={ref}
                  />
                )}
              />
            </FormGroup>
          )}
          <FormGroup>
            <Controller
              name="email"
              control={control}
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
                  type="email"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Email"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="role"
              control={control}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputSelect
                  id={name}
                  name={name}
                  options={optionsRole}
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Role"
                  error={error}
                  inputRef={ref}
                  data={value}
                  placeholder="Choose a role for the user"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/,
                  message: "Phone number must be 10 characters",
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
                  type="text"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Phone"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="address"
              control={control}
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <InputLabel
                  id={name}
                  name={name}
                  type="text"
                  onBlur={onBlur}
                  onChange={onChange}
                  label="Address"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button outline color="success" type="submit" onClick={handleSubmit(onSubmit)}>
            {loading ? <Spinner size="sm" /> : "Apply"}
          </Button>
          <Button outline color="secondary" onClick={() => toggle()}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Form>
  );
}

export default UserManagement;
