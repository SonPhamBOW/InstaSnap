import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useUserContext } from "../../context/AuthContext";
import { sidebarLinks } from "../../constants";
import { INavLink } from "../../types";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to={"/"} className="flex gap-3 items-center ml-4">
          <img src="/assets/images/branch.png" alt="" width={170} height={36} />
        </Link>

        <Link className="flex gap-3 items-center" to={`/profile/${user.id}`}>
          <img
            className="h-14 w-14 rounded-full"
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
          />
          <div className="flex flex-col ">
            <p className="body-bold text-white">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}
              >
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4 text-white"
                >
                  <img
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    src={link.imgURL}
                    alt={link.label}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <button className="flex items-center gap-4" onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="" />
        <p className="small-medium lg:base-medium text-white">Logout</p>
      </button>
    </nav>
  );
};

export default LeftSidebar;
