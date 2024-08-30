// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import bImg1 from "@/assets/banner/b1.jpg";
import bImg2 from "@/assets/banner/b2.webp";
import bImg5 from "@/assets/banner/b6.png";
import { Link } from "react-router-dom";

const bannerOptions = [
  {
    title: "Experience Premium Car Wash Services",
    subtitle: "We make your car shine like new with our expert care",
    img: bImg1,
  },
  {
    title: "Your Car Deserves the Best",
    subtitle: "High-quality car wash services tailored to your needs",
    img: bImg2,
  },
  {
    title: "Drive Clean, Drive Happy",
    subtitle: "Transform your car with our professional wash and detailing",
    img: bImg5,
  },
];

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {bannerOptions.map((item, index) => {
          return (
            <SwiperSlide key={index} className="relative">
              <img
                src={item.img}
                alt=""
                className="w-full lg:h-[500px] h-[350px] object-cover"
              />
              <div className="absolute top-0 overlay text-white flex flex-col justify-center items-center p-5">
                <h1 className="lg:text-5xl text-3xl font-bold">
                  Experience Premium <span className="text-primary">Car</span>{" "}
                  <span className="text-primary-foreground">Wash</span> Services
                </h1>
                <h2 className="lg:text-4xl text-xl font-semibold mt-5">
                  {item.subtitle}
                </h2>
                <div className="text-center mt-6">
                  <Link
                    to={"/services"}
                    className="bg-primary hover:bg-primary-foreground text-xl lg:py-3 py-2 lg:px-6 px-4 rounded-md font-medium mb-2"
                  >
                    Shine Your Ride
                  </Link>
                  <p className="text-xl font-semibold mt-4">
                    "Experience Premium Car Wash Services"
                  </p>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
