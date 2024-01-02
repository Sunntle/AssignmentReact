import NotFound from "../pages/NotFound";
import { lazy } from "react";
import { DefaultLayout, NoBreadcrumb, NotHeaderLayout } from "../layout";
import { HomePage, ShopPage, Page, AboutPage, ContactPage, Account, Cart, Unauthorized, Checkout, Bill, Orders, Profile } from "pages";
import { Dashboard, OrdersAdmin, ProductAdmin, UserAdmin } from "pages/Admin";
const publicRoutes = [
  {
    path: "",
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "home",
    component: HomePage,
    layout: DefaultLayout,
  },
  {
    path: "shop/*",
    component: ShopPage,
    layout: DefaultLayout,
    routes: [
      {
        path: ":id",
        component: lazy(() => import("../pages/ShopDetail")),
        layout: DefaultLayout,
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
    component: Cart,
    layout: DefaultLayout,
  },
  {
    path: "account",
    component: Account,
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
    path: "profile",
    component: Profile,
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
        component: Dashboard,
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
    component: Checkout,
    layout: DefaultLayout,
  },
  {
    path: "bill",
    component: Bill,
    layout: NoBreadcrumb,
  },
  {
    path: "orders",
    component: Orders,
    layout: DefaultLayout,
  },
];
export default publicRoutes;
export { privateRoutes };
