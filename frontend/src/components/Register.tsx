import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCheck } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [register, { isLoading, isError, error: apiError }] =
    useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
    if (isError && apiError) {
      const err = apiError as {
        status: number;
        message?: string;
        data?: { message: string };
      };
      console.error(err);
      if (err.status === 400) {
        setErrMsg(err.data?.message as string);
      } else {
        setErrMsg(err.message as string);
      }
    }
  }, [name, email, password, isError, apiError]);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name && email && password) {
      try {
        const result = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...result }));
        navigate("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("EE", error);
          setErrMsg(error.message as string);
        } else {
          setErrMsg("An unknown error occurred.");
        }
      }
    } else {
      setErrMsg("Please enter name, email and password.!");
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {isLoading && <div className="loader">Loading...</div>}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h1 className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <FontAwesomeIcon icon={faBook} className="mr-2" /> Book-App
        </h1>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up for your account
            </h1>
            {errMsg && (
              <div className="text-red-500 dark:text-red-400">{errMsg}</div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  ref={nameRef}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button className="w-full py-2.5 text-white rounded-lg cursor-pointer flex justify-center items-center">
                <span className="bg-gray-600 px-2 py-2 rounded hover:bg-gray-700">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Sign up
                </span>
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account yet?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Register;
