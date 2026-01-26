import { Outlet } from "react-router-dom";
import NavBar from "./navbar/NavBar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout