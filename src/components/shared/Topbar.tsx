import { Link, useNavigate } from "react-router-dom";
import { useSignOutAccount } from "../../lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useUserContext } from "../../context/AuthContext";

function Topbar() {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0);
    }
  }, [isSuccess]);
  return (
    <section className="topbar">
      <div className="flex items-center justify-between py-4 px-5">
        <Link to={"/"} className="flex gap-3 items-center">
          <img src="/assets/images/branch.png" alt="" width={130} height={325} />
        </Link>

        <div className="flex gap-4">
          <button onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="" />
          </button>
          <Link to={`/profile/${user.id}`} className="flex items-center gap-3">
            <img
              className="h-8 w-8 rounded-full"
              src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="profile"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Topbar;
