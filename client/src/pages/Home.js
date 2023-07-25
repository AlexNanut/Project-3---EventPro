import Contact from "../components/Contact";
import "../index.css";
import eventImage from "../assets/images/events.png"


const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome!</h1>
      <div className="home-content">
        <p>
        Welcome back! Our platform is designed to simplify event management like never before. Easily access all your upcoming events and make any adjustments with just a few clicks. Thank you for selecting EventPro as your go-to solution for all your event needs. We are certain that our platform will provide you with a seamless event planning experience.        </p>
      </div>
      <div className="container">
        <Contact />
      </div>
    </div>
  );
};

export default Home;