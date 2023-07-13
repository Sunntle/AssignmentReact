import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import "./CheckoutStyle.scss";
import { Controller, useForm } from "react-hook-form";
import { InputLabel, InputSelect } from "components/Input";
import axios from "axios";

function Checkout() {
  const { handleSubmit, control, watch } = useForm();
  const [province, SetProvince] = useState([]);
  const [district, SetDistrict] = useState([]);
  useEffect(() => {
    const fetchProvince = async () => {
      const response = await axios.get("https://provinces.open-api.vn/api/p/");
      const optionsProvince = response.data.reduce((acc, cur) => {
        const option = {
          value: cur.code,
          label: cur.name,
        };
        acc.push(option);
        return acc;
      }, []);
      SetProvince(optionsProvince);
    };
    fetchProvince();
  }, []);

  const fetchDistrict = async (code) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`);
    const data = response.data.districts;
    const optionsDistrict = data.reduce((acc, cur) => {
      const option = {
        value: cur.code,
        label: cur.name,
      };
      acc.push(option);
      return acc;
    }, []);
    SetDistrict(optionsDistrict);
  };
  const watchedValue = watch("Province");
  useEffect(() => {
    if (watchedValue) {
      fetchDistrict(watchedValue.value);
    }
  }, [watchedValue]);
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Container className="my-5 py-5">
      <Form className="text-start" onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col xs="12" lg="7">
            <h3>Billing Details</h3>
            <Row className="py-2">
              <Col xs="6">
                <FormGroup>
                  <Controller
                    name="firstName"
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
                        type="text"
                        onBlur={onBlur}
                        onChange={onChange}
                        label="First Name"
                        error={error}
                        inputRef={ref}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
              <Col xs="6">
                <FormGroup>
                  <Controller
                    name="lastName"
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
                        type="text"
                        onBlur={onBlur}
                        onChange={onChange}
                        label="Last Name"
                        error={error}
                        inputRef={ref}
                      />
                    )}
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className="py-2">
              <Controller
                name="Province"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <InputSelect
                    id={name}
                    name={name}
                    options={province}
                    onBlur={onBlur}
                    onChange={onChange}
                    label="Province"
                    error={error}
                    inputRef={ref}
                    placeholder="What province do you live in?"
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="py-2">
              <Controller
                name="District"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState,
                }) => (
                  <InputSelect
                    id={name}
                    name={name}
                    options={district}
                    onBlur={onBlur}
                    onChange={onChange}
                    label="District"
                    error={error}
                    inputRef={ref}
                    placeholder="What district do you live in?"
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="py-2">
              <Controller
                name="StreetAddress"
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
                    type="text"
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder="House number and street name"
                    label="StreetAddress"
                    error={error}
                    inputRef={ref}
                  />
                )}
              />
            </FormGroup>
            <FormGroup className="py-2">
              <Controller
                name="Phone"
                control={control}
                defaultValue=""
                rules={{ required: true, pattern: /((^(\+84|84|0|0084){1})(3|5|7|8|9))+([0-9]{8})$/ }}
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
                    inputRef={ref}
                  />
                )}
              />
            </FormGroup>
          </Col>
          <Col xs="12" lg="5">
            <h3>Your Order</h3>
            <div className="wrap-your-order p-4 shadown-sm rounded my-3">
              <div className="d-flex justify-content-between border-bottom py-3">
                <h4>Product</h4>
                <h4>Total</h4>
              </div>
              <div className="d-flex justify-content-between border-bottom py-4">
                <p className="m-0">Product name here</p>
                <p className="m-0">12.29$</p>
              </div>
              <div className="d-flex justify-content-between border-bottom py-4">
                <h6>Shipping</h6>
                <h6>Free shipping</h6>
              </div>
              <div className="d-flex justify-content-between py-3">
                <h4>Total</h4>
                <h4 className="your-order__price">12.29$</h4>
              </div>
            </div>
            <Button type="submit" className="w-100 text-uppercase my-3 py-2 px-auto text-white btn-confirm rounded-5">
              place order
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Checkout;
