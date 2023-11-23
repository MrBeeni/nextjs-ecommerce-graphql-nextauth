"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useState } from "react";

const Navbar: FC = () => {
  const pathname = usePathname();
  const { data } = useSession();
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const toggleNavebar = () => {
    setToggle(!toggle);
  };
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-green-400 text-2xl font-semibold whitespace-nowrap dark:text-white">
            M Store
          </span>
        </a>
        <button
          onClick={toggleNavebar}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`w-full md:block md:w-auto ${toggle ? "" : "hidden"}`}>
          <ul className="font-medium flex flex-col gap-2 p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <span
                onClick={() => router.push("/")}
                className={`block py-2 px-3 font-bold shadow-md shadow-gray-300 rounded cursor-pointer hover:text-white hover:bg-green-400 ${
                  pathname == "/"
                    ? "text-white bg-green-400"
                    : "  text-green-400 bg-gray-100"
                }`}
              >
                Home
              </span>
            </li>
            {data ? (
              <li>
                <span
                  onClick={() => signOut()}
                  className="block py-2 px-3 text-white bg-green-400 rounded cursor-pointer hover:text-white hover:bg-green-400  "
                >
                  signOut
                </span>
              </li>
            ) : (
              <>
                <li>
                  <span
                    onClick={() => router.push("/login")}
                    className={`block py-2 px-3 font-bold shadow-md shadow-gray-300 rounded cursor-pointer hover:text-white hover:bg-green-400 ${
                      pathname == "/login"
                        ? "text-white bg-green-400"
                        : "  text-green-400 bg-gray-100"
                    }`}
                  >
                    Login
                  </span>
                </li>
                <li>
                  <span
                    onClick={() => router.push("/register")}
                    className={`block py-2 px-3 font-bold shadow-md shadow-gray-300 rounded cursor-pointer hover:text-white hover:bg-green-400 ${
                      pathname == "/register"
                        ? "text-white bg-green-400"
                        : "  text-green-400 bg-gray-100"
                    }`}
                  >
                    Register
                  </span>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
