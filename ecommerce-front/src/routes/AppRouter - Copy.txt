import { lazy, Suspense } from "react";
// layouts
const MainLayout = lazy(() => import("@/layouts/MainLayout/MainLayout"));
const ProfileLayout = lazy(
  () => import("@/layouts/ProfileLayout/ProfileLayout")
);
// pages
const AboutUs = lazy(() => import("@/pages/AboutUs"));
const Cart = lazy(() => import("@/pages/Cart"));
const Categories = lazy(() => import("@/pages/Categories"));
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Products = lazy(() => import("@/pages/Products"));
const Register = lazy(() => import("@/pages/Register"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const Account = lazy(() => import("@/pages/Account"));
const Orders = lazy(() => import("@/pages/Orders"));
// error
import Error from "@/pages/Error";
// routing
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LottieHandler, SuspenseFallback } from "@/components/feedback";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "10%", textAlign: "center" }}>
            <LottieHandler type="loading" message="Loading please wait..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <SuspenseFallback>
            <Home />
          </SuspenseFallback>
        ),
      },
      {
        path: "cart",
        element: (
          <SuspenseFallback>
            <Cart />
          </SuspenseFallback>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <Wishlist />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <SuspenseFallback>
            <Products />
          </SuspenseFallback>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category Not Found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "categories",
        element: (
          <SuspenseFallback>
            <Categories />
          </SuspenseFallback>
        ),
      },
      {
        path: "about-us",
        element: (
          <SuspenseFallback>
            <AboutUs />
          </SuspenseFallback>
        ),
      },
      {
        path: "login",
        element: (
          <SuspenseFallback>
            <Login />
          </SuspenseFallback>
        ),
      },
      {
        path: "register",
        element: (
          <SuspenseFallback>
            <Register />
          </SuspenseFallback>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <SuspenseFallback>
              <ProfileLayout />
            </SuspenseFallback>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseFallback>
                <Account />
              </SuspenseFallback>
            ),
          },
          {
            path: "orders",
            element: (
              <SuspenseFallback>
                <Orders />
              </SuspenseFallback>
            ),
          },
        ],
      },
    ],
  },
]);
const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
