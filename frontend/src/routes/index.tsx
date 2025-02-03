import { lazy } from "react";

const Login = lazy(() => import("../components/Login"));
const Register = lazy(() => import("../components/Register"));
const Home = lazy(() => import("../components/Home"));
const RequiredAuth = lazy(() => import("../features/auth/RequiredAuth"));
const Book = lazy(() => import("../components/Books"));
const CreateBook = lazy(() => import("../components/CreateBook"));
const EditBook = lazy(() => import("../components/EditBook"));

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export const protectedRoutes = [
  {
    element: <RequiredAuth />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Book />,
      },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/edit-book/:id",
        element: <EditBook />,
      },
    ],
  },
];
