import { MenuLinks } from "@/utils/list.utils";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="mx-auto lg:px-[70px] lg:py-10 py-5 px-5 bg-primary-foreground/10 mt-[70px] text-slate-950 flex lg:flex-row flex-col justify-between gap-x-10 gap-y-5">
        <div className="lg:w-[33.33%]">
          <p className="text-4xl font-bold">
            <span className="text-primary">Car</span>{" "}
            <span className="text-primary-foreground">Wash</span>
          </p>
          <p className="mt-5">
            Effortless car care with premium cleaning services, easy booking,
            and convenient comparison for a spotless ride.
          </p>
        </div>
        <div className="lg:w-[33.33%] flex flex-col items-center">
          <p className="text-lg font-semibold mb-5">Important links</p>
          <div className="flex flex-col text-center gap-y-2 font-medium">
            {MenuLinks?.map((menu, idx) => (
              <Link key={idx} to={menu?.path}>
                {menu?.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="lg:w-[33.33%] flex flex-col lg:items-end items-center">
          <p className="font-semibold text-lg">Socials</p>
          <div className="flex gap-x-4 items-center text-secondaryColor mt-5">
            <p>
              <FaFacebookSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
            </p>
            <p>
              <FaInstagramSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
            </p>
            <p>
              <IoLogoYoutube className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
            </p>
            <p>
              <FaTwitterSquare className="text-2xl text-primary-foreground hover:text-blue-800 cursor-pointer" />{" "}
            </p>
          </div>
        </div>
      </div>
      <div className="lg:px-[70px] px-5 py-5 bg-primary-foreground text-white font-medium text-center">
        Design and developed by @ Car Wash - 2024
      </div>
    </>
  );
};

export default Footer;
