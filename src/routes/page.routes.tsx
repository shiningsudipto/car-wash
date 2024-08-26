import Home from "@/pages/home/Home";
import Details from "@/pages/details/Details";

export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "product-details/:id",
        element: <Details />,
      },
    ],
  },
];
