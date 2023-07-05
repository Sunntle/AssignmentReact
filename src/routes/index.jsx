import NotFound from "../components/NotFound";
import React from "react";
import { DefaultLayout, NotHeaderLayout } from "../components/Layout";
const publicRoutes = [
  {
    path: "/",
    component: React.lazy(() => import("../pages/Home")),
    layout: DefaultLayout
  },
  {
    path: "/home",
    component: React.lazy(() => import("../pages/Home")),
    layout: DefaultLayout
  },
  {
    path: "/shop",
    component: React.lazy(() => import("../pages/Shop")),
    layout: DefaultLayout
  },
  {
    path: "/pages",
    component: React.lazy(() => import("../pages/Page")),
    layout: DefaultLayout
  },
  {
    path: "*",
    component: NotFound,
    layout: NotHeaderLayout
  },
];
export default publicRoutes;
