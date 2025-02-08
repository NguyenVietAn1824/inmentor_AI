import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src= {logo}
        alt=""
        className="w-20 h-20 object-contain "
      />
    </Link>
  );
};

export default LogoContainer;