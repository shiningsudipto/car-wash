import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { routeGenerator } from "@/utils/routesGenerator";
import { pageRoutes } from "./page.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: routeGenerator(pageRoutes),
  },
]);
