import NotFound from "../components/NotFound";
import React from "react";
import { DefaultLayout, NotHeaderLayout, NoBreadcrumb } from "../components/Layout";
const publicRoutes = [
  {
    path: "/",
    component: React.lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "/home",
    component: React.lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "/shop",
    component: React.lazy(() => import("../pages/Shop")),
    layout: DefaultLayout,
  },
  {
    path: "/pages",
    component: React.lazy(() => import("../pages/Page")),
    layout: DefaultLayout,
  },
  {
    path: "/sign-in",
    component: React.lazy(() => import("../pages/Sign-In")),
    layout: DefaultLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: NotHeaderLayout,
  },
];
export default publicRoutes;
