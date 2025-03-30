import { Link, NavLink, useLocation } from "react-router-dom";
import { bottombarLinks, sidebarLinks } from "../../constants";
import { INavLink } from "../../types";

function Bottombar() {
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <Link
            key={link.label}
            to={link.route}
            className={`${
              isActive && "bg-primary-500 rounded-[10px]"
            } flex items-center flex-col gap-1 p-2 transition`}
          >
            <img
              className={`${isActive && "invert-white"}`}
              src={link.imgURL}
              alt={link.label}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
}

export default Bottombar;
