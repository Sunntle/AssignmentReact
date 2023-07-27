import { InputLabel, InputSelect } from "components/Input";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from "reactstrap";

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
      setValue("email", "");
      setValue("role", "");
      setValue("phone", "");
      setValue("address", "");
    }
  }, [data, setValue, checkAction]);
  const onSubmit = (dataForm) => {
    console.log(dataForm);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Modal scrollable size="lg" keyboard isOpen={modal} toggle={() => toggle()} centered>
        <ModalHeader toggle={() => toggle()}>Product Information</ModalHeader>
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
                  label="User name"
                  error={error}
                  value={value}
                  inputRef={ref}
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="email"
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
                  placeholder="What district do you live in?"
                />
              )}
            />
          </FormGroup>
          <FormGroup>
            <Controller
              name="phone"
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
