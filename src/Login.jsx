import React, { useState } from "react";
import { account, ID } from "./appwrite";
import { Link } from "react-router-dom";
import "./About.css";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signIn, setSignIn] = useState(true);

  const validateEmail = (email) => {
    return email.endsWith("@gla.ac.in");
  };

  console.log(loggedInUser);

  const login = async (email, password) => {
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      alert("Failed to login. Please check your credentials.");
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create(ID.unique(), email, password, name);
      login(email, password);
    } catch (error) {
      alert("Failed to register. Please try again.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Only GLA email addresses are allowed.");
      return;
    }
    login(email, password);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Only GLA email addresses are allowed.");
      return;
    }
    register(email, password, name);
  };

  return (
    <div>
      {loggedInUser ? (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{`Hello ${loggedInUser.name}`}</p>
              <p className="text-sm">
                We have limited storage resources for this free and open project
                aimed at supporting fellow students. Please refrain from
                uploading any content that could compromise a student's dignity.{" "}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">
                To Upload Notes you should be Authenticated first
              </p>
              <p className="text-sm">
                Due to limitation of resources we can't allow everyone to upload
                Notes and assignments to get the admin password please contact
                us.
              </p>
            </div>
          </div>
        </div>
      )}

      {loggedInUser ? (
        <div class="user-info-container">
          <h3>UserName: {loggedInUser.name}</h3>
          <h3>Email: {loggedInUser.email}</h3>
          <div className="inline-flex items-center ml-4 px-3 py-2 font-medium text-center bg-blue-700 rounded-lg">
            <a
              onClick={async () => {
                await account.deleteSession("current");
                setLoggedInUser(null);
              }}
              className="logout-button"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/" style={{ textDecoration: "none" }}>
              <img
                className="mx-auto h-10 w-auto"
                src="./img/netflix (1).png"
                alt="NoteFlix"
              />
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to Upload Dashboard
              </h2>
            </Link>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {!signIn && (
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <p>
                {signIn
                  ? "Don't have Account yet ?"
                  : "Already Have an Account ?"}
                <span
                  onClick={() => {
                    setSignIn(!signIn);
                  }}
                  className="text-black cursor-pointer"
                >
                  {signIn ? "Register" : "SignIn"}
                </span>{" "}
              </p>
              {signIn && (
                <div>
                  <button
                    type="button"
                    onClick={() => login(email, password)}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              )}
              {!signIn && (
                <div>
                  <button
                    type="button"
                    onClick={async () => {
                      await account.create(ID.unique(), email, password, name);
                      login(email, password);
                    }}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Register
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
