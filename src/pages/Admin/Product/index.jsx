import { Button, Col, Container, Input, Row, Table, Form } from "reactstrap";
import "./ProductAdminStyle.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { deleteProduct, fetchColorProduct, fetchProduct, fetchSizeProduct, fetchTypeProduct } from "api";
import PaginationComponent from "components/Pagination";
import Select from "react-select";
import ProductManagement from "./ProductManagement";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toast/toastSlice";
import LoadingComponent from "components/Loading";
function ProductAdmin() {
  const options = [
    { value: 0, label: "Default" },
    { value: 1, label: "Low To High" },
    { value: 2, label: "High To Low" },
  ];
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [product, setProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [typeProduct, setTypeProduct] = useState([]);
  const [sizeProduct, setSizeProduct] = useState([]);
  const [colorProduct, setColorProduct] = useState([]);
  const [filter, setFilter] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [order, setOrder] = useState(options[0]);
  const [loading, setLoading] = useState(true);

  const limit = 4;
  const dispatch = useDispatch();
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
      } else {
        const arrFilter = value.split("=");
        if (arrFilter[0] === "size" || arrFilter[0] === "color") {
          stringResponse = `?${arrFilter[0]}_like=${arrFilter[1]}`; //?size_like=S//?color_like="red"
          stringRes = `?_page=${currentPage}&_limit=${limit}&${arrFilter[0]}_like=${arrFilter[1]}`;
        } else {
          stringResponse = `?price_${arrFilter[0]}=${arrFilter[1]}`; //?price_gte//lte=500000
          stringRes = `?_page=${currentPage}&_limit=${limit}&price_${arrFilter[0]}=${arrFilter[1]}`;
        }
      }

      if (order.value === 1) {
        stringRes += `&_sort=price&_order=asc`;
      } else if (order.value === 2) {
        stringRes += `&_sort=price&_order=desc`;
      } else {
        stringRes += `&_sort=date&_order=desc`;
      }
      response = await fetchProduct(stringResponse);
      res = await fetchProduct(stringRes);
      const resTypeProduct = await fetchTypeProduct();
      const resSizeProduct = await fetchSizeProduct();
      const resColorProduct = await fetchColorProduct();
      setTypeProduct(resTypeProduct);
      setColorProduct(resColorProduct);
      setSizeProduct(resSizeProduct);
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
      handleClicked(`?q=${inputValue.trim()}`);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue]);

  //toggle fetchForm edit Product
  const toggle = async (id, action) => {
    if (id !== undefined) {
      if (action === "edit") {
        const res = await fetchProduct(`/${id}`);
        setProduct(res);
      }
      setModal(true);
    } else {
      setProduct({});
      fetchData(filter);
      setModal(false);
    }
  };
  const handleDelete = async (id) => {
    const res = await deleteProduct(id);
    dispatch(showToast({ type: "success", message: res }));
    fetchData(filter);
  };
  return loading ? (
    <LoadingComponent />
  ) : (
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
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type Product</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Array.isArray(data) && data?.map((el, index) => {
            return (
              <tr key={index}>
                <td style={{ maxWidth: "100px" }}>
                  <img className="img-fluid" src={el.allImg?.split(";")[0]} alt="img" />
                </td>
                <td>{el.name}</td>
                <td>{el.price}</td>
                <td>{typeProduct?.find((product) => product.id === el.idLoai)?.tenLoai}</td>
                <td>{moment(new Date(el.date)).format("DD-MM-YYYY")}</td>
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
      {modal && (
        <ProductManagement
          modal={modal}
          data={product}
          size={sizeProduct}
          color={colorProduct}
          type={typeProduct}
          toggle={toggle}
        />
      )}
    </Container>
  );
}

export default ProductAdmin;
