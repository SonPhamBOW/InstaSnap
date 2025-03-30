import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FormEvent, useState } from "react";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutation";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/AuthContext";
import { account } from "../../lib/appwrite/config";

function SigninForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: signInAccount } = useSignInAccount();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Check if there's an existing session
      const currentSession = await account.get();
      if (currentSession) {
        console.log("Already logged in, redirecting...");
        navigate("/");
        return;
      }
    } catch (error) {
      console.log(error);
      console.log("No active session, proceeding with login...");
    }

    // Attempt login
    const session = await signInAccount({
      email: email,
      password: password,
    });

    if (!session) {
      return toast("Sign in failed, Please try again!", { autoClose: 3000 });
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      toast("Sign in failed, Please try again!", { autoClose: 3000 });
    }
  };
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md mx-auto flex flex-col gap-3"
        >
          <div className="h-fit flex flex-col gap-4 items-center justify-center text-center p-9 border border-gray-400 rounded-md w-420">
            <img
              className="h-max w-72 object-contain my-5"
              src="/assets/images/branch.png"
              alt="Branch Logo"
            />
            <div className="flex flex-col gap-2 w-full">
              <input
                className="w-full h-9 bg-transparent border 
                    border-gray-400 rounded-sm px-3 text-xs 
                    focus:outline-none
                    placeholder:text-gray-500"
                type="text"
                placeholder="Mobile Number or Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full h-9 bg-transparent border border-gray-400 rounded-sm px-3 text-xs 
                    autofill:bg-transparent autofill:text-inherit
                    focus:outline-none
                    placeholder:text-gray-500"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="my-2 flex w-full flex-row items-center justify-center gap-2 bg-gray-300 text-gray-800 px-16 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>

            <div className="flex flex-row items-center justify-center w-full my-4">
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <p className="text-gray-500 px-3">OR</p>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
            </div>

            <button
              style={{
                background:
                  "linear-gradient(90deg, rgba(193,46,46,1) 0%, rgba(177,184,26,1) 38%, rgba(48,77,182,1) 83%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
              className="flex flex-row items-center justify-center gap-2 px-16 py-2 rounded-lg"
            >
              <FcGoogle className="text-xl" />
              <span className="hover:text-gray-300">Log in with Google</span>
            </button>

            <p
              onClick={() => console.log("forgot pass")}
              className="cursor-pointer"
            >
              Forgot password?
            </p>
          </div>
          <div className="h-fit flex flex-col gap-4 items-center justify-center text-center p-4 border border-gray-400 rounded-md w-420">
            <div className="flex flex-row gap-1 text-xs">
              <p>Don't have a account?</p>
              <p
                className="text-blue-500 cursor-pointer"
                onClick={() => navigate("/sign-up")}
              >
                Sign up
              </p>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SigninForm;
