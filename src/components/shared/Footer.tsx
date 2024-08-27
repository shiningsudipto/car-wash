import { MenuLinks } from "@/utils/utils";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="p-[70px] bg-primary-foreground mt-[70px] text-white flex justify-between">
      <div>Info</div>
      <div>
        <p className="text-lg font-medium mb-4">Important links</p>
        <div className="flex flex-col gap-y-2 font-medium">
          {MenuLinks?.map((menu, idx) => (
            <Link key={idx} to={menu?.path}>
              {menu?.name}
            </Link>
          ))}
        </div>
      </div>
      <div>Socials</div>
    </div>
  );
};

export default Footer;
