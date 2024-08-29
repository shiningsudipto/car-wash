import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMenu } from "react-icons/io5";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
const MenuLinks = [
  {
    path: "/service-management",
    name: "Service Management",
  },
  {
    path: "/slot-management",
    name: "Slot Management",
  },
  {
    path: "/user-management",
    name: "User-Management",
  },
];
const Dashboard = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <div>
      <div className="flex">
        <div>
          <div className="md:block hidden w-[250px] bg-primary-foreground/10 h-[100vh] p-5">
            <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4">
              {MenuLinks?.map((menu, idx) => (
                <Link key={idx} to={`/${user.role + menu?.path}`}>
                  {menu?.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="md:hidden block">
            <Drawer direction="left">
              <DrawerTrigger>
                <IoMenu className="text-2xl" />{" "}
              </DrawerTrigger>
              <DrawerContent className="left-0 top-0 mt-0 rounded-l-none w-[250px] dashboard-drawer">
                <DrawerClose className="flex justify-end m-2">
                  <AiOutlineCloseSquare className=" text-3xl p-1" />
                </DrawerClose>
                <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4">
                  {MenuLinks?.map((menu, idx) => (
                    <Link key={idx} to={menu?.path}>
                      {menu?.name}
                    </Link>
                  ))}
                  <Link to={"/admin/dashboard"}>Dashboard</Link>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
