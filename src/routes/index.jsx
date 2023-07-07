import NotFound from "../components/NotFound";
import React from "react";
import { DefaultLayout, NotHeaderLayout, NoBreadcrumb } from "../layout";
const publicRoutes = [
  {
    path: "",
    component: React.lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "home",
    component: React.lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "shop/*",
    component: React.lazy(() => import("../pages/Shop")),
    layout: DefaultLayout,
    routes: [
      {
        path: ":id",
        component: React.lazy(() => import("../pages/ShopDetail")),
        layout: NoBreadcrumb,
      },
    ],
  },
  {
    path: "pages",
    component: React.lazy(() => import("../pages/Page")),
    layout: DefaultLayout,
  },
  {
    path: "cart",
    component: React.lazy(() => import("../pages/Cart")),
    layout: DefaultLayout,
  },
  {
    path: "sign-in",
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
