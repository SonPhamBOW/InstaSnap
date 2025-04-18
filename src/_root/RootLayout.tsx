import { Outlet } from "react-router-dom";
import LeftSidebar from "../components/shared/LeftSidebar";
import Topbar from "../components/shared/Topbar";
import Bottombar from "../components/shared/Bottombar";

function RootLayout() {
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full bg-black">
        <Outlet />
      </section>

      <Bottombar />
    </div>
  );
}

export default RootLayout;
