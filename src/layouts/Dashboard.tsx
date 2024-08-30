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
import { TUser, useCurrentUser } from "@/redux/features/auth/authSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { userRole } from "@/utils/const.utils";
import Navbar from "@/components/shared/Navbar";

type TRoute = {
  path: string;
  name: string;
  children?: TRoute[];
};

const adminRoutes = [
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
    name: "User Management",
    children: [
      {
        path: "/user-management/bookings",
        name: "Bookings",
      },
      {
        path: "/user-management",
        name: "User Management",
      },
    ],
  },
];

const userRoutes = [
  {
    path: "/profile",
    name: "Profile",
  },
  {
    path: "/past-bookings",
    name: "Past Bookings",
  },
  {
    path: "/upcoming-bookings",
    name: "Upcoming Bookings",
  },
];

const Dashboard = () => {
  const user = useAppSelector(useCurrentUser) as TUser;
  let sidebarItems;

  switch (user!.role) {
    case userRole.ADMIN:
      sidebarItems = adminRoutes;
      break;
    case userRole.USER:
      sidebarItems = userRoutes;
      break;

    default:
      break;
  }

  const MenuItem = ({
    path,
    name,
    children,
  }: {
    path: string;
    name: string;
    children?: Array<{ path: string; name: string }>;
  }) => (
    <AccordionItem value={path} className="border-b-0">
      <AccordionTrigger className="py-1">{name}</AccordionTrigger>
      {children && (
        <AccordionContent>
          <ul className="ms-3">
            {children.map((subRoute) => (
              <li key={subRoute.path}>
                <Link
                  to={`/${user.role + subRoute.path}`}
                  className="block py-2 text-base"
                >
                  {subRoute.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div>
          {/* Desktop Sidebar */}
          <div className="md:block hidden bg-primary-foreground/10 h-[100vh] p-5">
            <div className="flex flex-col w-[200px] gap-y-3 font-medium px-4">
              {sidebarItems?.map((menu: TRoute) =>
                menu?.children ? (
                  <Accordion
                    key={menu.path}
                    type="single"
                    collapsible
                    className=""
                  >
                    <MenuItem
                      path={`/${user.role}${menu.path}`}
                      name={menu.name}
                      children={menu?.children}
                    />
                  </Accordion>
                ) : (
                  <Link
                    key={menu.path}
                    to={`/${user.role}${menu.path}`}
                    className="block"
                  >
                    {menu.name}
                  </Link>
                )
              )}
            </div>
          </div>

          {/* Mobile Drawer */}
          <div className="md:hidden block bg-primary-foreground/20 h-[100vh] p-3">
            <Drawer direction="left">
              <DrawerTrigger>
                <IoMenu className="text-2xl" />
              </DrawerTrigger>
              <DrawerContent className="left-0 top-0 mt-0 rounded-l-none w-[220px] dashboard-drawer">
                <DrawerClose className="flex justify-end m-2">
                  <AiOutlineCloseSquare className="text-3xl p-1" />
                </DrawerClose>
                <Accordion
                  type="single"
                  collapsible
                  className="w-full p-5 space-y-3"
                >
                  {sidebarItems?.map((menu: TRoute) =>
                    menu?.children ? (
                      <Accordion
                        key={menu.path}
                        type="single"
                        collapsible
                        className=""
                      >
                        <MenuItem
                          path={`/${user.role}${menu.path}`}
                          name={menu.name}
                          children={menu?.children}
                        />
                      </Accordion>
                    ) : (
                      <Link
                        key={menu.path}
                        to={`/${user.role}${menu.path}`}
                        className="block"
                      >
                        {menu.name}
                      </Link>
                    )
                  )}
                </Accordion>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="p-5 w-full max-h-[100vh] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
