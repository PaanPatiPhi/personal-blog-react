import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import notfoundImage from "../../assets/image/notfound/notfound_image.png"

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <img src={notfoundImage} alt="not-found" className="w-[300px]"/>

        <h1 className="notfound-title">404 Error</h1>
        <p className="notfound-subtitle">Sorry, page not found</p>

        <button
          className="home-button"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;