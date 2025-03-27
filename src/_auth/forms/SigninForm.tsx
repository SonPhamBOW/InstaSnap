import { FaFacebookSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SigninForm() {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <form
          // onSubmit={handleSubmit}
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
              />
              <input
                className="w-full h-9 bg-transparent border border-gray-400 rounded-sm px-3 text-xs 
                    autofill:bg-transparent autofill:text-inherit
                    focus:outline-none
                    placeholder:text-gray-500"
                type="password"
                placeholder="Password"
              />
              <button
                type="submit"
                className="my-2 flex w-full flex-row items-center justify-center gap-2 bg-blue-600 text-white px-16 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>

            <div className="flex flex-row items-center justify-center w-full my-4">
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
              <p className="text-gray-500 px-3">OR</p>
              <div className="flex-grow border-t border-gray-300 mx-2"></div>
            </div>

            <button className="flex flex-row items-center justify-center gap-2 text-blue-500 px-16 py-2 rounded-lg">
              <FaFacebookSquare className="text-2xl" />
              <span className="hover:text-gray-300">Log in with Facebook</span>
            </button>

            <p onClick={() => console.log("forgot pass")} className="cursor-pointer">Forgot password?</p>
          </div>
          <div className="h-fit flex flex-col gap-4 items-center justify-center text-center p-4 border border-gray-400 rounded-md w-420">
            <div className="flex flex-row gap-1 text-xs">
              <p>Don't have a account?</p>
              <p className="text-blue-500 cursor-pointer" onClick={() => navigate('/sign-up')}>
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
