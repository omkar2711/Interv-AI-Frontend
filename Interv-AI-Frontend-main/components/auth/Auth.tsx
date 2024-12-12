import React, { useState } from "react";
import { motion } from "framer-motion";
import { BASE_URL } from "@/components/config/api";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [resetPass, setResetPass] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleAuthPage = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  const handleresetPassowrd = () => {
    setResetPass(!resetPass);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginBody = {
      email: formData.email,
      password: formData.password,
    };
    const SignupBody = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    if (isLogin) {
      try {
        setLoading(true);
        console.log(loginBody, "this is login body");
        const res = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(loginBody),
        });
        const data = await res.json();
        if (data.status.toLowerCase() === "error") {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (data.status.toLowerCase() === "success") {
          setCookie(
            "userInfo",
            JSON.stringify({
              name: data?.name,
              email: data?.email,
            }),
            {
              maxAge: 30 * 24 * 60 * 60,
              path: "/",
            }
          );
          setCookie("userauth", JSON.stringify(data?.token), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          router.push("/demo");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err);
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        const res = await fetch(`${BASE_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(SignupBody),
        });
        const data = await res.json();
        if (data.status.toLowerCase() === "error") {
          setError(data.message);
          setLoading(false);
          return;
        }
        if (data.status.toLowerCase() === "success") {
          setCookie("userauth", JSON.stringify(data.token), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          setCookie("userInfo", JSON.stringify(data.createdUser), {
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
          });
          router.push("/demo");
          setLoading(false);
        }
      } catch (err: any) {
        setError(err);
        console.log(err);
      }
    }
  };

  return (
    <div>
      <h1 className="text-5xl font-bold text-[#1E2B3A] mb-16">
        {isLogin ? "Login" : "Signup"}
      </h1>
      <form
        className="md:w-[600px] xl:w-[800px]"
        onSubmit={(e) => handleFormSubmit(e)}
      >
        {isLogin || (
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="floating_email"
            id="floating_email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="floating_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {error && (
          <div className="text-red-500 text-sm font-bold bg-red-100 px-2 py-2 rounded-md mb-4">
            {error}
          </div>
        )}
        <div className="flex justify-between">
          <span className="text-medium font-light text-gray-800 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-sm font-medium cursor-pointer text-blue-600 hover:underline dark:text-primary-500"
              onClick={handleAuthPage}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </span>

          {!resetPass && (
            <span
              onClick={handleresetPassowrd}
              className="text-sm font-medium cursor-pointer text-blue-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </span>
          )}
        </div>
        <div>
          <div className="flex mt-6 ">
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.55,
                ease: [0.075, 0.82, 0.965, 1],
              }}
            >
              <div
                className="group rounded-full px-6 py-2 text-[13px] font-semibold transition-all flex items-center justify-center bg-[#f5f7f9] text-[#1E2B3A] no-underline active:scale-95 scale-100 duration-75"
                style={{
                  boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                }}
              >
                <span className="mr-2">
                  {" "}
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </span>

                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="#1E2B3A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="#1E2B3A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
