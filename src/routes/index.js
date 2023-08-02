import NotFound from "../pages/NotFound";
import { lazy } from "react";
import { DefaultLayout, NoBreadcrumb, NotHeaderLayout } from "../layout";
import Page from "pages/Page";
import AboutPage from "pages/About";
import ContactPage from "pages/Contact";
import Unauthorized from "pages/Unauthorized";
import UserAdmin from "pages/Admin/User";
import ProductAdmin from "pages/Admin/Product";
import OrdersAdmin from "pages/Admin/Orders";

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
    component: Page,
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
    path: "about",
    component: AboutPage,
    layout: DefaultLayout,
  },
  {
    path: "contact",
    component: ContactPage,
    layout: DefaultLayout,
  },
  {
    path: "unauthorized",
    component: Unauthorized,
    layout: NoBreadcrumb,
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
        component: UserAdmin,
        layout: NotHeaderLayout,
      },
      {
        path: "product",
        component: ProductAdmin,
        layout: NotHeaderLayout,
      },
      {
        path: "orders",
        component: OrdersAdmin,
        layout: NotHeaderLayout,
      },
    ],
  },
  {
    path: "checkout",
    component: lazy(() => import("../pages/Checkout")),
    layout: DefaultLayout,
  },
  {
    path: "bill",
    component: lazy(() => import("../pages/Checkout/Bill")),
    layout: NoBreadcrumb,
  },
  {
    path: "orders",
    component: lazy(() => import("../pages/Orders")),
    layout: DefaultLayout,
  },
];
export default publicRoutes;
export { privateRoutes };
