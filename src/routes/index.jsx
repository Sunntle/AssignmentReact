import NotFound from "../pages/NotFound";
import { lazy } from "react";
import { DefaultLayout, NoBreadcrumb, NotHeaderLayout } from "../layout";
const publicRoutes = [
  {
    path: "",
    component: lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "home",
    component: lazy(() => import("../pages/Home")),
    layout: NoBreadcrumb,
  },
  {
    path: "shop/*",
    component: lazy(() => import("../pages/Shop")),
    layout: DefaultLayout,
    routes: [
      {
        path: ":id",
        component: lazy(() => import("../pages/ShopDetail")),
        layout: NoBreadcrumb,
      },
    ],
  },
  {
    path: "pages",
    component: lazy(() => import("../pages/Page")),
    layout: DefaultLayout,
  },
  {
    path: "cart",
    component: lazy(() => import("../pages/Cart")),
    layout: DefaultLayout,
  },
  {
    path: "account",
    component: lazy(() => import("../pages/Account")),
    layout: DefaultLayout,
  },
  {
    path: "checkout",
    component: lazy(() => import("../pages/Checkout")),
    layout: DefaultLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: NoBreadcrumb,
  },
];
const privateRoutes = [
  {
    path: "admin/*",
    routes: [
      {
        path: "",
        component: lazy(() => import("../pages/Admin/Dashboard")),
        layout: NotHeaderLayout,
      },
      {
        path: "user",
        component: lazy(() => import("../pages/Admin/User")),
        layout: NotHeaderLayout,
      },
      {
        path: "product",
        component: lazy(() => import("../pages/Admin/Product")),
        layout: NotHeaderLayout,
      },
    ],
  },
];
export default publicRoutes;
export { privateRoutes };
