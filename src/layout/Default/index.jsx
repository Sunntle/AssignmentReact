import BreadcrumbComponent from "components/Breadcrumb";
import Footer from "components/Footer";
import Header from "components/Header";
import ScrollToTop from "components/ScrollToTop";

import "./DefaultLayout.scss";
import ToastMessage from "components/Toast";
import {  useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { handleTextCapitalize } from "utils/helper";
const regexRouteDetail = /^\/shop\/(\d+)$/
const ROUTE_NO_BREADCRUMB =  ['bill']
function DefaultLayout({ children }) {
  const location = useLocation();
  const headerRef = useRef(null);
  const [customizeStyle, SetCustomizeStyle] = useState(0)

  useLayoutEffect(() => {
    window.addEventListener("resize",()=>{
      SetCustomizeStyle(headerRef.current?.offsetHeight)
    })
    window.scrollTo(0, 0)
  });

  useEffect(()=>{
    if(headerRef.current !== null){
      SetCustomizeStyle(headerRef.current?.offsetHeight)
    }
  },[headerRef])
  const isNoBreadcrumb = useMemo(()=>{
    if(location.pathname === "/" || location.pathname === "/home") return {status: false, content: "home"}
    if(regexRouteDetail.test(location.pathname)) return {status: false, content: "detail"}
    if(ROUTE_NO_BREADCRUMB.includes(location.pathname)) return {status: false, content: location.pathname}
    return {status: true, content: location.pathname}
  },[location.pathname])
  return (
    <div className="wrapper position-relative">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{handleTextCapitalize(isNoBreadcrumb.content)}</title>
      </Helmet>
      <ToastMessage />
      <Header ref={headerRef}/>
      <div style={{marginTop: `${customizeStyle}px`}} className="min-vh-100 position-relative">
        {isNoBreadcrumb.status ? <BreadcrumbComponent />: ""}
        <div className={isNoBreadcrumb.status ? "m-3 p-3" :""}>{children}</div>
      </div>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default DefaultLayout;
