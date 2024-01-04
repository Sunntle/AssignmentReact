import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import "./CheckoutStyle.scss";
import { Controller, useForm } from "react-hook-form";
import { InputLabel, InputSelect } from "components/Input";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, createPayment } from "api";
import { useNavigate } from "react-router-dom";
import { removeAll } from "redux/cart/cartSlice";
import { showToast } from "redux/toast/toastSlice";
const optionsPayment = [
  {
    value: "COD",
    label: "Cash on delivery",
  },
  {
    value: "NCB",
    label: "NCB Bank",
  },
  {
    value: "VNPAYQR",
    label: "VNPAY QR",
  },
  {
    value: "ATM",
    label: "ATM CARD",
  },
  {
    value: "VISA",
    label: "VISA",
  },
  {
    value: "AGRIBANK",
    label: "AGRIBANK Bank",
  },
  {
    value: "BIDV",
    label: "BIDV Bank",
  },
  {
    value: "VIETCOMBANK",
    label: "VIETCOMBANK Bank",
  },
];
function Checkout() {
  const { handleSubmit, control, watch } = useForm();
  const [province, SetProvince] = useState([]);
  const [district, SetDistrict] = useState([]);
  const cart = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const fetchDistrict = useCallback(async (code) => {
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
  },[]);
  const watchedValue = watch("Province");
  useEffect(() => {
    if (watchedValue) {
      fetchDistrict(watchedValue.value);
    }
  }, [fetchDistrict, watchedValue]);

  const onSubmit = async (data) => {
    const items = cart.reduce((acc, cur) => {
      const item = { id: cur.id, size: cur.sizeSelected, color: cur.colorSelected, quantity: cur.quantity };
      acc.push(item);
      return acc;
    }, []);
    const total = cart.reduce((acc, cur) => {
      return acc + cur.quantity * cur.price;
    }, 0);
    const infoOrder = {
      item: items,
      total: total,
      name: `${data.firstName} ${data.lastName} `,
      address: `${data.StreetAddress} ${data.District.label} ${data.Province.label}`,
      payment_id: data.paymentMethod.value,
    };
    const res = await createOrder(infoOrder);
    if (res) {
      dispatch(removeAll());
      if (data.paymentMethod.value === "COD") {
        navigate("/bill", { state: res });
      } else {
        const dataPayment = {
          amount: total.toString() ?? "0",
          orderDescription: `${data.firstName} ${data.lastName} pay ID Order ${res}`,
          orderType: "fashion",
          bankCode: data.paymentMethod.value,
          language: null,
          order_id: res,
        };
        const paymenResponse = await createPayment(dataPayment);
        window.location.href = paymenResponse;
      }
    }else{
      dispatch(showToast({ type: "danger", message: "Something wrong!" }))
    }
  };
  return (
    <Container className="">
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
              <div className="border-bottom py-4">
                {cart.map((el, index) => {
                  return (
                    <div className="d-flex" key={index}>
                      <Col xs="6" className="text-start">
                        <p className="m-0">
                          {el.name} - <span className="text-capitalize">{el.colorSelected}</span> - {el.sizeSelected} -
                          X{el.quantity}
                        </p>
                      </Col>
                      <Col xs="6" className="text-end">
                        <p className="m-0">
                          {(el.price * el.quantity).toLocaleString("vi", { style: "currency", currency: "VND" })}
                        </p>
                      </Col>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between border-bottom py-4">
                <h6>Shipping</h6>
                <h6>Free shipping</h6>
              </div>
              <div className="d-flex justify-content-between align-items-center py-3">
                <h4 className="m-0">Total</h4>
                <h4 className="your-order__price m-0">
                  {cart
                    .reduce((acc, cur) => {
                      return acc + cur.price * cur.quantity;
                    }, 0)
                    .toLocaleString("vi", { style: "currency", currency: "VND" })}
                </h4>
              </div>
              <h4 className="mt-3">Payment method: </h4>
              <FormGroup>
                <Controller
                  name="paymentMethod"
                  control={control}
                  defaultValue={optionsPayment[0]}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                    fieldState: { invalid, isTouched, isDirty, error },
                    formState,
                  }) => (
                    <>
                      <InputSelect
                        id={name}
                        name={name}
                        options={optionsPayment}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={error}
                        inputRef={ref}
                        data={value}
                        placeholder="Selecte payment method "
                      />
                    </>
                  )}
                />
              </FormGroup>
            </div>

            <Button type="submit" className="w-100 text-uppercase my-3 py-2 px-auto text-white btn-confirm rounded-5">
              Place order
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Checkout;
