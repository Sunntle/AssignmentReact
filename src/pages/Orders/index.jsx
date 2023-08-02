import React, { useEffect, useState } from "react";
import { Badge, Button, Container, Nav, NavItem, TabContent, TabPane } from "reactstrap";
import Select from "react-select";

import "./OrdersStyle.scss";
import OrderList from "./OrdersList";
import { fetchOrder, updateStatusTransaction } from "services";
import PaginationComponent from "components/Pagination";
import LoadingComponent from "components/Loading";
import { useDispatch } from "react-redux";
import { showToast } from "redux/toast/toastSlice";

function OrdersPage() {
  const options = [
    {
      label: "Past 1 Week",
      value: 0,
    },
    {
      label: "Past 1 Month",
      value: 1,
    },
    {
      label: "Past 3 Month",
      value: 2,
    },
  ];
  const [activeTab, setActiveTab] = useState("1");
  const [filter, setFilter] = useState(options[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const limit = 3;
  const fetchAllData = async (value) => {
    try {
      let response,
        res,
        stringResponse = `/user/detail`,
        stringRes = `/user/detail`;
      if (value === "1") {
        stringResponse += ``;
        stringRes += `?_page=${currentPage}&_limit=${limit}`;
      } else if (value === "2") {
        stringResponse += `?status_like=1`;
        stringRes += `?status_like=1&_page=${currentPage}&_limit=${limit}`;
      } else if (value === "3") {
        stringResponse += `?status_like=2`;
        stringRes += `?status_like=2&_page=${currentPage}&_limit=${limit}`;
      } else {
        stringResponse += `?status_like=0`;
        stringRes += `?status_like=0&_page=${currentPage}&_limit=${limit}`;
      }
      if (stringResponse.includes("?")) {
        stringResponse += "&";
      } else {
        stringResponse += "?";
      }
      stringRes += "&";
      if (filter.value === 2) {
        stringRes += `create_at_gte=-3month`;
        stringResponse += `create_at_gte=-3month`;
      } else if (filter.value === 1) {
        stringRes += `create_at_gte=-1month`;
        stringResponse += `create_at_gte=-1month`;
      } else {
        stringRes += `create_at_gte=-7day`;
        stringResponse += `create_at_gte=-7day`;
      }
      stringRes += `&_sort=create_at&_order=DESC`;
      response = await fetchOrder(stringResponse);
      res = await fetchOrder(stringRes);
      setAllData(response);
      setTotalPages(Math.ceil(response.length / limit));
      setData(res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSetCurPage = (page) => {
    setCurrentPage(page);
  };
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  useEffect(() => {
    fetchAllData(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filter, activeTab]);
  const cancleOrders = async (id) => {
    const data = {
      status: 2,
    };
    const res = await updateStatusTransaction(id, data);
    if (res) dispatch(showToast({ type: "success", message: "Cancle order successfully" }));
    fetchAllData(activeTab);
  };
  return (
    <Container className="orders-user-wrap text-start my-5 py-5">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <h3 className="py-3 m-0">
            Your orders <Badge>{allData?.length}</Badge>
          </h3>
          <div className="position-relative">
            <div>
              <Nav tabs className="d-inline-flex  border rounded-3 p-1 justify-content-center align-items-center mb-3 ">
                <NavItem>
                  <Button className={activeTab === "1" ? "active" : ""} onClick={() => toggleTab("1")}>
                    <h5>All</h5>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className={activeTab === "4" ? "active" : ""} onClick={() => toggleTab("4")}>
                    <h5>Success</h5>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className={activeTab === "2" ? "active" : ""} onClick={() => toggleTab("2")}>
                    <h5>Pending</h5>
                  </Button>
                </NavItem>
                <NavItem>
                  <Button className={activeTab === "3" ? "active" : ""} onClick={() => toggleTab("3")}>
                    <h5>Cancle</h5>
                  </Button>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="w-100">
                <TabPane tabId="1" className="py-3 ">
                  {data.length > 0 ? <OrderList orders={data} /> : "You don't have any orders yet"}
                </TabPane>
                <TabPane tabId="2" className="py-3">
                  {data.length > 0 ? (
                    <OrderList orders={data} cancleOrders={cancleOrders} cancle={true} />
                  ) : (
                    "You don't have any orders yet"
                  )}
                </TabPane>
                <TabPane tabId="3" className="py-3">
                  {data.length > 0 ? <OrderList orders={data} /> : "You don't have any orders yet"}
                </TabPane>
                <TabPane tabId="4" className="py-3">
                  {data.length > 0 ? <OrderList orders={data} /> : "You don't have any orders yet"}
                </TabPane>
              </TabContent>
            </div>
            <div className="position-absolute filter-options">
              <Select
                options={options}
                defaultValue={options[0]}
                onChange={(value) => setFilter(value)}
                theme={(theme) => ({
                  ...theme,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              ></Select>
            </div>
          </div>
          {totalPages > 0 && (
            <PaginationComponent curPage={currentPage} totalPage={totalPages} onPageChange={handleSetCurPage} />
          )}
        </>
      )}
    </Container>
  );
}

export default OrdersPage;
