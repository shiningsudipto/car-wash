import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { routeGenerator } from "@/utils/routesGenerator";
import { pageRoutes } from "./page.routes";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/layouts/Dashboard";
import { adminRoutes } from "./admin.routes";
import { userRoutes } from "./user.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
  {
    path: "/admin",
    element: <Dashboard />,
    children: routeGenerator(adminRoutes),
  },
  {
    path: "/user",
    element: <Dashboard />,
    children: routeGenerator(userRoutes),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
