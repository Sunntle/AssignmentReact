import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from "components/Pagination";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";

import { Button, Col, Container, Form, Input, Row, Table } from "reactstrap";
import { showToast } from "redux/toast/toastSlice";
import { deleteUser, fetchProduct, fetchUser } from "services";
import UserManagement from "./UserManagement";

function UserAdmin() {
  const options = [
    { value: 0, label: "Default" },
    { value: 1, label: "A-Z" },
    { value: 2, label: "Z-A" },
  ];
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [user, SetUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [filter, setFilter] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [order, setOrder] = useState(options[0]);
  const limit = 4;
  const dispatch = useDispatch();
  const fetchData = async (value = 0) => {
    try {
      let response, res, stringResponse, stringRes;
      if (value === 0) {
        stringResponse = ``;
        stringRes = `?_page=${currentPage}&_limit=${limit}`;
      } else if (value.includes("?q")) {
        stringResponse = value;
        stringRes = `${value}&_page=${currentPage}&_limit=${limit}`; //?q=abc
      }
      if (order.value === 1) {
        stringRes += `&_sort=name&_order=asc`;
      } else if (order.value === 2) {
        stringRes += `&_sort=name&_order=desc`;
      }
      response = await fetchUser(stringResponse);
      res = await fetchUser(stringRes);
      setTotalPages(Math.ceil(response.length / limit));
      setCountProduct(response.length);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
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

  //toggle fetchForm edit Product
  const toggle = async (id, action) => {
    if (id !== undefined) {
      if (action === "edit") {
        const res = await fetchUser(`/${id}`);
        SetUser(res);
      }
      setModal(true);
    } else {
      SetUser({});
      fetchData(filter);
      setModal(false);
    }
  };
  const handleDelete = async (id) => {
    const res = await deleteUser(id);
    dispatch(showToast({ type: "success", message: res }));
    fetchData(filter);
  };
  return (
    <Container fluid className="pt-5 wrap-admin-product">
      <div className="d-flex align-items-center justify-content-between pb-5">
        <h2 className="title m-0">List Product</h2>
        <Button color="success" outline onClick={() => toggle(null, "add")}>
          Add new
        </Button>
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
      <Table responsive hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data?.map((el, index) => {
            return (
              <tr key={index}>
                <td>{el.name || "None"}</td>
                <td>{el.username}</td>
                <td>{el.email}</td>
                <td>{el.role === 1 ? "Admin" : "User"}</td>
                <td>{el.phone}</td>
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
      {modal && <UserManagement modal={modal} data={user} toggle={toggle} />}
    </Container>
  );
}

export default UserAdmin;
