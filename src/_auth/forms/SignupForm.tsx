import { FormEvent, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/shared/Loader";

interface UserInfo {
  email: string;
  password: string;
  fullName: string;
  userName: string;
}

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    const userInfo: UserInfo = {
      email: email.trim(),
      password: password,
      fullName: fullname.trim(),
      userName: userName.trim(),
    };

    console.log("Signup attempted", userInfo);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto flex flex-col gap-3"
      >
        <div className="h-fit flex flex-col gap-4 items-center justify-center text-center p-9 border border-gray-400 rounded-md w-420">
          <img
            className="h-max w-72 object-contain"
            src="/assets/images/branch.png"
            alt="Branch Logo"
          />
          <p className="text-gray-300 text-sm px-4">
            Sign up to see photos and videos from your friends.
          </p>
          <button className="flex flex-row items-center justify-center gap-2 bg-blue-600 text-white px-16 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            <FaFacebookSquare className="text-2xl" />
            <span>Log in with Facebook</span>
          </button>
          <div className="flex flex-row items-center justify-center w-full my-4">
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
            <p className="text-gray-500 px-3">OR</p>
            <div className="flex-grow border-t border-gray-300 mx-2"></div>
          </div>

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
            <input
              className="w-full h-9 bg-transparent border 
              border-gray-400 rounded-sm px-3 text-xs 
              focus:outline-none
              placeholder:text-gray-500"
              type="text"
              placeholder="Fullname"
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              className="w-full h-9 bg-transparent border 
              border-gray-400 rounded-sm px-3 text-xs 
              focus:outline-none
              placeholder:text-gray-500"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <p className="text-xs text-gray-600">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <a
              target="_blank"
              href="https://www.facebook.com/help/instagram/261704639352628"
              className="decoration-clone text-gray-300"
            >
              Learn More
            </a>
          </p>

          <p className="text-xs text-gray-600">
            By signing up, you agree to our
            <a
              target="_blank"
              className="decoration-clone text-gray-300"
              href="https://help.instagram.com/581066165581870/?locale=en_US"
            >
              {" "}
              Term
            </a>
            <a
              target="_blank"
              className="decoration-clone text-gray-300"
              href="https://help.instagram.com/581066165581870/?locale=en_US"
            >
              , Privacy Policy
            </a>{" "}
            and{" "}
            <a
              target="_blank"
              className="decoration-clone text-gray-300"
              href="https://help.instagram.com/581066165581870/?locale=en_US"
            >
              Cookies Policy
            </a>
          </p>

          <button
            type="submit"
            onClick={() => setIsLoading(!isLoading)}
            className="flex w-full flex-row items-center justify-center gap-2 bg-blue-600 text-white px-16 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader/> Loading...
              </div>
            ) : (
              'Sign up'
            )}
          </button>
        </div>
        <div className="h-fit flex flex-col gap-4 items-center justify-center text-center p-4 border border-gray-400 rounded-md w-420">
          <div className="flex flex-col text-xs">
            <p>Have a account?</p>
            <p
              className="text-blue-500 cursor-pointer"
              onClick={() => navigate("/sign-in")}
            >
              Log in
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
