import { faEye, faHeart, faMagnifyingGlass, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadingComponent from "components/Loading";
import PaginationComponent from "components/Pagination";
import "pages/Home/QuickView/QuickViewStyle.scss";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import { Button, Col, Input, Row } from "reactstrap";
import { fetchColorProduct, fetchProduct, fetchSizeProduct, fetchTypeProduct } from "api";
import SideBarAccording from "../SideBar";
import "./ShopAreaStyle.scss";
const options = [
  { value: 0, label: "Default" },
  { value: 1, label: "Low To High" },
  { value: 2, label: "High To Low" },
];
const limit = 6;
function ShopArea() {
  const location = useLocation();
  const [open, setOpen] = useState("0");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [typeProduct, setTypeProduct] = useState([]);
  const [sizeProduct, setSizeProduct] = useState([]);
  const [colorProduct, setColorProduct] = useState([]);
  const [filter, setFilter] = useState(0);
  const [inputValue, setInputValue] = useState(location.state?.kw || "");
  const [order, setOrder] = useState(options[0]);
  const [loading, setLoading] = useState(true);

  const accordingSideBar = [
    {
      name: "categories",
      data: typeProduct,
    },
    {
      name: "filter price",
      data: null,
    },
    {
      name: "size",
      data: sizeProduct,
    },
    {
      name: "color",
      data: colorProduct,
    },
  ];

  const fetchData = useCallback(async (value = 0) => {
    try {
      let stringResponse, stringRes;
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
      }
      const [response, res, resTypeProduct, resSizeProduct, resColorProduct] =
        await Promise.all([
          fetchProduct(stringResponse),
          fetchProduct(stringRes),
          fetchTypeProduct(),
          fetchSizeProduct(),
          fetchColorProduct(),
        ]);
      setColorProduct(resColorProduct);
      setSizeProduct(resSizeProduct);
      setTypeProduct(resTypeProduct);
      setTotalPages(Math.ceil(response.length / limit));
      setCountProduct(response.length);
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  },[currentPage, order.value]);
  const handleClicked = (value) => {
    setFilter(value);
  };
  useEffect(() => {
    fetchData(filter);
  }, [currentPage, fetchData, filter, order]);
  const toggle = useCallback((id) => {
    if (open === id) setOpen("0");
    else   setOpen(id);
  },[open]);
  const handleSetCurPage = useCallback((page) => {
    setCurrentPage(page);
  },[]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleClicked(`?q=${inputValue.trim()}`);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [inputValue]);

  const renderContent = (el, index) => {
    return (
      <Col xs="12" sm="6" md="4" className="shop__product__item " key={index}>
        <div className="position-relative product-img shadow-sm">
          <img className="img-fluid" src={el.allImg?.split(";")[0]} alt="product" />
          <div className="product-actions">
            <Button className="position-absolute start-0 rounded-0 ">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
            <Button className="position-absolute start-50 rounded-0 seeMore">
              <Link
                to={{
                  pathname: `${el.id}`,
                }}
                className="text-decoration-none text-white"
              >
                Detail
              </Link>
            </Button>
            <Button className="position-absolute end-0 rounded-0">
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </div>
        </div>
        <div className="product-content py-2">
          <h3 className="fs-5">{el.name}</h3>
          <p className="my-2">{el.price.toLocaleString("vi", { style: "currency", currency: "VND" })}</p>
          <div className="rating">
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
            <span>
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </div>
      </Col>
    );
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <Row>
      <Col xs="12" lg="3">
        <div className="shop__sidebar">
          <div className="sidebar__search mb-5">
            <div className="d-flex position-relative" name="searchFrm" sub="true" role="search">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="me-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
                name="searchFrm"
              />
              <Button  className="top-50 end-0 position-absolute bg-transparent p-2 translate-middle border-0" type="submit">
                <FontAwesomeIcon icon={faMagnifyingGlass} color="#6c757d" />
              </Button>
            </div>
          </div>
          <div className="sidebar__accordion">
            {accordingSideBar.map((el, index) => {
              return (
                <SideBarAccording
                  key={el.name + index}
                  index={(++index).toString()}
                  open={open}
                  toggle={toggle}
                  type={el.name}
                  data={el.data}
                  handleClicked={handleClicked}
                />
              );
            })}
          </div>
        </div>
      </Col>
      <Col xs="12" lg="9">
        <div className="shop__product__option my-lg-2 my-4">
          <Row className="align-items-center justify-content-center">
            <Col xs="6">
              <p className="m-0 text-start">
                Showing {data.length} of {countProduct} results
              </p>
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
        </div>
        <div className="shop__product">
          <Row id="shop__product__items">
            {Array.isArray(data) && data?.length > 0 ? (
              data?.map((el, index) => renderContent(el, index))
            ) : (
              <h5 className="text-center mt-5 pt-5">No products match...</h5>
            )}
          </Row>
          {totalPages > 0 && (
            <PaginationComponent curPage={currentPage} totalPage={totalPages} onPageChange={handleSetCurPage} />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default ShopArea;
