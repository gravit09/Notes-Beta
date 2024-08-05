import React, { useState, useContext } from "react";
import { account, databases, ID, Query } from "./appwrite";
import { Link } from "react-router-dom";
import "./About.css";
import { AuthContext } from "./AuthContext";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [signIn, setSignIn] = useState(true);
  const [otp, setOTP] = useState("");
  const { setUser } = useContext(AuthContext);
  const [otpSent, setOtpSent] = useState(false);
  const [sessionToken, setSessionToken] = useState(null);

  //for the validation of email
  const validateEmail = (email) => {
    return email.endsWith("@gla.ac.in");
  };

  //for sending the OTP
  const sendOTP = async (email) => {
    try {
      const token = await account.createEmailToken(ID.unique(), email);
      setSessionToken(token);
      setOtpSent(true);
    } catch (error) {
      alert("Failed to send OTP. Please check your Email");
    }
  };

  //for verifying otp and logging in the user
  const verifyOTP = async (email, otp) => {
    try {
      if (!sessionToken) {
        alert("Session token is missing. Please request OTP again.");
        return;
      }
      const session = await account.createSession(sessionToken.userId, otp);
      setLoggedInUser(await account.get());
      setUser(session);
    } catch (error) {
      alert("Failed to login. Please check your Email");
    }
  };

  //check wether user already exist or not
  const checkUsernameExists = async (name) => {
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_DATABASE_ID,
        process.env.REACT_APP_USER_COLLECTION_ID,
        [Query.equal("UserName", name)]
      );
      return response.total > 0;
    } catch (error) {
      console.error("Error checking username existence:", error);
      return false;
    }
  };

  const register = async (email, password, name) => {
    try {
      const usernameExists = await checkUsernameExists(name);

      if (usernameExists) {
        alert("Username already exists");
      } else {
        const res = await account.create(ID.unique(), email, password, name);
        sendOTP(email);
        alert("User registered successfully");
      }
    } catch (error) {
      if (error.code === 409) {
        alert("User already exists");
      } else {
        console.error("Error during registration:", error);
        alert(error);
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Only GLA email addresses are allowed.");
      return;
    }
    sendOTP(email);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Only GLA email addresses are allowed.");
      return;
    }
    register(email, password, name);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    verifyOTP(email, otp);
  };

  return (
    <div>
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
              Notes and assignments. To Upload Notes You should Authenticate
              Yourself First.
            </p>
          </div>
        </div>
      </div>

      {otpSent && !loggedInUser ? (
        <form
          onSubmit={handleVerifyOTP}
          className="flex flex-col mt-40 items-center w-72 mx-auto p-5 border border-gray-300 rounded-lg shadow-md bg-gray-50"
        >
          <input
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            placeholder="Please enter your OTP"
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none text-md"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700 text-lg transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      ) : loggedInUser ? (
        <div className="user-info-container">
          <h3>UserName: {loggedInUser.name}</h3>
          <h3>Email: {loggedInUser.email}</h3>
          <div className="inline-flex items-center ml-4 px-3 py-2 font-medium text-center bg-blue-700 rounded-lg">
            <a
              onClick={async () => {
                await account.deleteSession("current");
                setLoggedInUser(null);
                setUser(null);
                setOtpSent(false);
              }}
              className="logout-button"
            >
              Logout
            </a>
          </div>
          <div className="inline-flex items-center ml-4 px-3 py-2 font-medium text-center bg-blue-700 rounded-lg">
            <Link to="/" className="logout-button ">
              Home
            </Link>
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
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      UserName
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
                </>
              )}

              <p>
                {signIn
                  ? "Don't have an account yet?"
                  : "Already have an account?"}
                <span
                  onClick={() => {
                    setSignIn(!signIn);
                  }}
                  className="text-black cursor-pointer"
                >
                  {signIn ? " Register" : " Sign In"}
                </span>{" "}
              </p>
              {signIn && (
                <div>
                  <button
                    type="button"
                    onClick={handleLogin}
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
                    onClick={handleRegister}
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
