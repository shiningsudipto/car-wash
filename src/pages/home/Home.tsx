import Banner from "./components/Banner";
import Review from "./components/Review";
import Services from "./components/Services";
import "./style.css";

const Home = () => {
  return (
    <div>
      <Banner />
      <Services />
      <Review />
    </div>
  );
};

export default Home;
