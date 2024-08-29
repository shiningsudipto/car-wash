import ServiceManagement from "@/pages/dashboard/admin/serviceManagement/ServiceManagement";
import SlotManagement from "@/pages/dashboard/admin/slotManagement/SlotManagement";
import UserManagement from "@/pages/dashboard/admin/userManagement/UserManagement";

export const adminRoutes = [
  {
    path: "dashboard",
    element: <ServiceManagement />,
    children: [
      {
        path: "service-management",
        element: <ServiceManagement />,
      },
      {
        path: "slot-management",
        element: <SlotManagement />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
    ],
  },
];
