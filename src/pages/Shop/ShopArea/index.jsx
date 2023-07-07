import { faEye, faHeart, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Container,
  Form,
  Input,
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "./ShopAreaStyle.scss";

import PaginationComponent from "../../../components/Pagination";
import axios from "axios";
function ShopArea() {
  const [open, setOpen] = useState("0");
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const limit = 1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/product/`);
        const res = await axios.get(`http://localhost:3000/product/?_page=${currentPage}&_limit=${limit}`);
        setTotalPages(Math.round(response.data.length / limit));
        setCountProduct(response.data.length);
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);
  const toggle = (id) => {
    if (open === id) {
      setOpen("0");
    } else {
      setOpen(id);
    }
  };
  const handleSetCurPage = (page) => {
    setCurrentPage(page);
  };
  const options = [
    { value: 0, label: "Default" },
    { value: 1, label: "Low To High" },
    { value: 2, label: "High To Low" },
  ];
  return (
    <Container className="my-5 py-5">
      <Row>
        <Col xs="12" lg="3">
          <div className="shop__sidebar">
            <div className="sidebar__search mb-5">
              <Form className="d-flex position-relative" name="searchFrm" role="search">
                <Input className=" me-2" type="text" placeholder="Search" aria-label="Search" name="searchFrm" />
                <Button className="btn-search position-absolute bg-transparent border-0" type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} color="#6c757d" />
                </Button>
              </Form>
            </div>
            <div className="sidebar__accordion">
              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="1">CATEGORIES</AccordionHeader>
                  <AccordionBody className="text-muted text-start" accordionId="1">
                    22
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="2">FILTER PRICE</AccordionHeader>
                  <AccordionBody className="text-muted text-start" accordionId="2">
                    <Link href="#" className="text-muted text-decoration-none price" data-price="0">
                      0đ - 500000đ
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="2">
                    <Link href="#" className="text-muted text-decoration-none price" data-price="0">
                      0đ - 500000đ
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="2">
                    <Link href="#" className="text-muted text-decoration-none price" data-price="1">
                      500000đ+
                    </Link>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="3">SIZE</AccordionHeader>
                  <AccordionBody className="text-muted text-start" accordionId="3">
                    <Link href="#" className="text-muted text-decoration-none size-s">
                      S
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="3">
                    {" "}
                    <Link href="#" className="text-muted text-decoration-none size-m">
                      M
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="3">
                    {" "}
                    <Link href="#" className="text-muted text-decoration-none size-l">
                      L
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="3">
                    {" "}
                    <Link href="#" className="text-muted text-decoration-none size-xl">
                      XL
                    </Link>
                  </AccordionBody>
                  <AccordionBody className="text-muted text-start" accordionId="3">
                    {" "}
                    <Link href="#" className="text-muted text-decoration-none size-2xl">
                      2XL
                    </Link>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
              <Accordion flush open={open} toggle={toggle}>
                <AccordionItem>
                  <AccordionHeader targetId="4">COLOR</AccordionHeader>
                  <AccordionBody className="text-muted text-start" accordionId="4">
                    <Label for="color-0">
                      <Input
                        style={{ width: 50 }}
                        type="color"
                        name="product__color"
                        id="color-0"
                        className="rounded-0 p-0"
                      />
                    </Label>
                  </AccordionBody>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </Col>
        <Col xs="12" lg="9">
          <div className="shop__product__option my-lg-0 my-4">
            <Row>
              <Col xs="6">
                <p className="m-0 text-start">
                  Showing {data.length} of {countProduct} results
                </p>
              </Col>
              <Col xs="6" className="text-end">
                <div className="d-inline-block">
                  <Select
                    options={options}
                    defaultValue={options[0]}
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
              {data.map((el, index) => {
                return (
                  <Col xs="12" sm="6" md="4" className="shop__product__item" key={index}>
                    <div className="position-relative product-img">
                      <img
                        className="img-fluid"
                        src="https://flone.jamstacktemplates.dev/assets/img/product/fashion/1.jpg"
                        alt="product"
                      />
                      <div className="product-actions">
                        <Button className="position-absolute start-0 rounded-0 ">
                          <FontAwesomeIcon icon={faHeart} />
                        </Button>
                        <Button className="position-absolute start-50 border-end border-start rounded-0  seeMore">
                          See Detail
                        </Button>
                        <Button className="position-absolute end-0  rounded-0 ">
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
              })}
            </Row>
            <PaginationComponent curPage={currentPage} totalPage={totalPages} onPageChange={handleSetCurPage} />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ShopArea;
