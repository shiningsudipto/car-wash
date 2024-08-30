import { Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMenu } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, TUser, useCurrentUser } from "@/redux/features/auth/authSlice";
import { MenuLinks } from "@/utils/list.utils";

const Navbar = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const conditionalLinks = (
    <>
      {!user && (
        <Link to={"/sign-in"} className="primary-border-btn">
          Login
        </Link>
      )}
      {user && (
        <div className="flex lg:flex-row flex-col lg:items-center gap-3">
          <Link to={`/${user.role}/dashboard`}>Dashboard</Link>
          <button onClick={handleLogout} className="primary-border-btn">
            Logout
          </button>
        </div>
      )}
    </>
  );

  return (
    <div className="h-[60px] flex justify-between items-center lg:px-[60px] px-5 py-2 bg-primary-foreground/10 text-slate-950">
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
        {conditionalLinks}
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
              {conditionalLinks}
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
