import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from "components/Pagination";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { Button, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";
import { showToast } from "redux/toast/toastSlice";
import { deleteOrder, fetchOrder, updateStatusTransaction } from "services";

import { Controller, useForm } from "react-hook-form";
import { InputSelect } from "components/Input";
import DetailOrder from "pages/Orders/Detail";
import "./OrderStyle.scss";
import LoadingComponent from "components/Loading";
function OrdersAdmin() {
  const options = [
    {
      label: "Default",
      value: 0,
    },
    {
      label: "Old",
      value: 1,
    },
  ];
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [item, setItem] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [filter, setFilter] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [order, setOrder] = useState(options[0]);
  const [loading, setLoading] = useState(true);
  const limit = 8;
  const dispatch = useDispatch();
  const { control } = useForm();
  const optionsStatus = [
    { label: "Success", value: 0 },
    { label: "Pending", value: 1 },
    { label: "Fail", value: 2 },
  ];
  const fetchData = async (value = 0) => {
    try {
      let response, res, stringResponse, stringRes;
      if (value !== 0 && typeof value == "number") {
        stringResponse = `/idLoai/${value}`;
        stringRes = `/idLoai/${value}?_page=${currentPage}&_limit=${limit}`;
      } else if (value === 0) {
        stringResponse = ``;
        stringRes = `?_page=${currentPage}&_limit=${limit}`;
      } else if (value.includes("?q")) {
        stringResponse = value;
        stringRes = `${value}&_page=${currentPage}&_limit=${limit}`; //?q=abc
      }
      if (order.value === 1) {
        stringRes += `&_sort=create_at&_order=asc`;
      } else {
        stringRes += `&_sort=create_at&_order=desc`;
      }

      response = await fetchOrder(stringResponse);
      res = await fetchOrder(stringRes);
      setTotalPages(Math.ceil(response.length / limit));
      setCountProduct(response.length);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //handle SetCondition for fetchData
  const handleClicked = (value) => {
    setFilter(value);
  };

  //handleFetchData
  useEffect(() => {
    fetchData(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter, order]);
  const handleSetCurPage = (page) => {
    setCurrentPage(page);
  };

  //handleSearch
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleClicked(`?q=${inputValue}`);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue]);

  const updateStatus = async (status, id) => {
    const res = await updateStatusTransaction(id, {
      status: status.value,
    });
    if (res) {
      dispatch(showToast({ type: "success", message: "Update successfully" }));
    } else {
      dispatch(showToast({ type: "danger", message: "Something's wrong" }));
    }
  };
  //toggle fetchForm edit Product
  const toggle = async (id = null) => {
    if (id != null) {
      const res = await fetchOrder(`/order_items/${id}`);
      setItem(res);
      setModal(true);
    } else {
      setModal(false);
    }
  };
  const handleDelete = async (order_id) => {
    const res = await deleteOrder(order_id);
    dispatch(showToast({ type: "success", message: res }));
    fetchData(filter);
  };
  return loading ? (
    <LoadingComponent />
  ) : (
    <Container fluid className="pt-5 wrap-admin-orders wrap-admin-product">
      <div className="d-flex align-items-center justify-content-between pb-5">
        <h2 className="title m-0">List Orders</h2>
      </div>
      <Row className="align-items-center justify-content-center py-3">
        <Col xs="6">
          <Form className="d-flex w-50" name="searchFrm" role="search">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="me-2 search"
              type="text"
              placeholder="Search"
              aria-label="Search"
              name="searchFrm"
            />
          </Form>
        </Col>
        <Col xs="6" className="text-end">
          <div className="d-inline-block">
            <Select
              options={options}
              defaultValue={order}
              onChange={(value) => setOrder(value)}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
              styles={{
                control: (styles) => ({ ...styles, border: "none" }),
              }}
            ></Select>
          </div>
        </Col>
      </Row>
      <Table hover>
        <thead>
          <tr>
            <th>#Order</th>
            <th>User</th>
            <th>Total</th>
            <th>Date</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.id}</td>
                <td>{el.user_id}</td>
                <td>{el.total}</td>
                <td>{moment(el.date).format("DD-MM-YYYY")}</td>
                <td>{el.payment_id}</td>
                <td>
                  <Form>
                    <FormGroup>
                      <Controller
                        name={`status +${index}`}
                        control={control}
                        defaultValue={
                          el.status === 1 ? optionsStatus[1] : el.status === 2 ? optionsStatus[2] : optionsStatus[0]
                        }
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState,
                        }) => (
                          <InputSelect
                            id={el.id}
                            name={name}
                            options={optionsStatus}
                            onBlur={onBlur}
                            onChange={onChange}
                            anotherAction={updateStatus}
                            error={error}
                            inputRef={ref}
                            data={value}
                          />
                        )}
                      />
                    </FormGroup>
                  </Form>
                </td>
                <td>
                  <Button outline color="info" onClick={() => toggle(el.id, "edit")}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button outline color="danger" onClick={() => handleDelete(el.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <p className="m-0 text-start">
        Showing {data?.length} of {countProduct} results
      </p>
      <PaginationComponent curPage={currentPage} totalPage={totalPages} onPageChange={handleSetCurPage} />
      {modal && <DetailOrder modal={modal} data={item} toggle={toggle} />}
    </Container>
  );
}

export default OrdersAdmin;
