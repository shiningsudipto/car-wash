import fImg1 from "@/assets/features/f1.jpg";
import fImg2 from "@/assets/features/f2.jpeg";
import fImg3 from "@/assets/features/f3.jpg";
import fImg4 from "@/assets/features/f4.jpg";
import fImg5 from "@/assets/features/f5.webp";
import fImg6 from "@/assets/features/f6.webp";
import SectionTitle from "@/components/reUsable/SectionTitle";

const featuredServices = [
  {
    name: "Premium Car Wash",
    description: "Get your car sparkling clean with our premium wash service.",
    image: fImg1,
    price: 30,
    duration: 45, // duration in minutes
  },
  {
    name: "Interior Detailing",
    description:
      "Deep cleaning of your car’s interior for a fresh and clean look.",
    image: fImg2,
    price: 50,
    duration: 60,
  },
  {
    name: "Express Wash",
    description: "Quick and thorough wash for those on the go.",
    image: fImg3,
    price: 15,
    duration: 20,
  },
  {
    name: "Tire & Wheel Cleaning",
    description:
      "Specialized cleaning for tires and wheels to make them shine.",
    image: fImg4,
    price: 20,
    duration: 30,
  },
  {
    name: "Full Service Detailing",
    description:
      "Comprehensive detailing service covering both interior and exterior.",
    image: fImg5,
    price: 100,
    duration: 120,
  },
  {
    name: "Engine Cleaning",
    description:
      "Thorough cleaning of your car’s engine for better performance.",
    image: fImg6,
    price: 70,
    duration: 75,
  },
];

const Services = () => {
  return (
    <div className="container mt-14">
      <SectionTitle
        title="Our Top Services"
        subTitle="Explore our most popular services, carefully selected to give your car the best care it deserves"
      />
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-10">
        {featuredServices.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.image} alt="" className="h-[250px] object-cover" />
              <h2 className="text-xl font-semibold text-primary-foreground mt-4">
                {item.name}
              </h2>
              <p className="">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
