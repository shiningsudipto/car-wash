import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMenu } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useAppSelector } from "@/redux/hooks";
import { TUser, useCurrentUser } from "@/redux/features/auth/authSlice";

const Navbar = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const MenuLinks = [
    {
      path: "/",
      name: "Home",
    },
    {
      path: "/services",
      name: "Services",
    },
    {
      path: "/reviews",
      name: "Reviews",
    },
    {
      path: "/sign-in",
      name: "Login",
    },
  ];

  return (
    <div className="h-[60px] flex justify-between items-center lg:px-[60px] px-5 py-2">
      <Link to={"/"} className="flex gap-x-2 items-center">
        <img src="FT.png" alt="" className="h-[42px]" />
        <p className="text-3xl font-bold">
          <span className="text-primary">Car</span>{" "}
          <span className="text-primary-foreground">Wash</span>
        </p>
      </Link>
      <div className="md:flex items-center gap-x-3 font-medium hidden">
        {MenuLinks?.map((menu, idx) => (
          <Link key={idx} to={menu?.path}>
            {menu?.name}
          </Link>
        ))}
        {user && <Link to={`/${user.role}/dashboard`}>Dashboard</Link>}
      </div>
      <div className="md:hidden block">
        <Drawer direction="right">
          <DrawerTrigger>
            <IoMenu className="text-2xl" />{" "}
          </DrawerTrigger>
          <DrawerContent className="right-0 top-0 mt-0 ms-[200px] rounded-r-none">
            <DrawerClose className="flex justify-end m-2">
              <AiOutlineCloseSquare className=" text-3xl p-1" />
            </DrawerClose>
            <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4">
              {MenuLinks?.map((menu, idx) => (
                <Link key={idx} to={menu?.path}>
                  {menu?.name}
                </Link>
              ))}
              <Link to={"/dashboard"}>Dashboard</Link>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
