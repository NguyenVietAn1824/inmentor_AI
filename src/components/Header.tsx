import { useAuth } from "@clerk/clerk-react";
import { NavLink } from "react-router-dom";
import { cn } from "../lib/utils";
import { Container } from "./container";
import LogoContainer from "./Logo-container";
import {NavigationRoutes} from "../routes/Navigation-route";
import ProfileContainer from "./Profile-container";
const Header: React.FC = () => {
  const { userId } = useAuth();
  return (
    <header
      className={cn(
        "justify-between w-full h-20 border-b duration-100 transition-all ease-in-out"
      )}
    >
      <Container>
        {/*Logo section*/}
        <LogoContainer />
        {/*Navigation section*/}
        <nav className="hidden md:flex items-center gap-4 justify-between space-x-4">
          <NavigationRoutes />
          {userId && (
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                cn(
                  "text-base text-neutral-600",
                  isActive && "text-neutral-900 font-semibold"
                )
              }
            >
              Take an interview
            </NavLink>
          )}
        </nav>

        {/*Profile section*/}
        <ProfileContainer />
      </Container>
    </header>
  );
};

export default Header;
