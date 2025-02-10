import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "../components/container";
import AuthHanlder from "../handler/auth-handler";

const PublicLayout: React.FC = () => {
  return (
    <div>
      <AuthHanlder  />
        <Outlet />
    </div>
  );
};

export default PublicLayout;
