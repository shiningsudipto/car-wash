import Home from "@/pages/home/Home";
import Details from "@/pages/details/Details";
import SignIn from "@/pages/Signin";
import SignUp from "@/pages/Signup";
import Reviews from "@/pages/Reviews";

export const pageRoutes = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "product-details/:id",
        element: <Details />,
      },
      {
        path: "reviews",
        element: <Reviews />,
      },
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
];
