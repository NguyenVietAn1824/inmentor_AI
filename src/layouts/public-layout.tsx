import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Container } from "../components/container";
import AuthHanlder from "../handler/auth-handler";

const PublicLayout: React.FC = () => {
  return (
    <div className="w-full">
      <AuthHanlder  />
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
};

export default PublicLayout;
