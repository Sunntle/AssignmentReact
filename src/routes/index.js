import NotFound from "../pages/NotFound";
import { DefaultLayout, NoBreadcrumb, NotHeaderLayout } from "../layout";
import { HomePage, ShopPage, Page, AboutPage, ContactPage, Account, Cart, Unauthorized, Checkout, Bill, Orders, Profile, Favorites, ErrorPage } from "pages";
import { Dashboard, OrdersAdmin, ProductAdmin, UserAdmin } from "pages/Admin";
import ShopDetail from "pages/ShopDetail";
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
        component: ShopDetail,
        layout: DefaultLayout,
      },
    ],
  },
  {
    path: "pages",
    component: Page,
    layout: NoBreadcrumb,
  },
  {
    path: "favorites",
    component: Favorites,
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
    layout: DefaultLayout,
  },
  {
    path: "error",
    component: ErrorPage,
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
    layout: DefaultLayout,
  },
  {
    path: "orders",
    component: Orders,
    layout: DefaultLayout,
  },
];
export default publicRoutes;
export { privateRoutes };
