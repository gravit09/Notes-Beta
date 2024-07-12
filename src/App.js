import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Subject from "./Subject";
import Labs from "./Labs";
import About from "./About";
import Roles from "./Roles";
import Upload from "./Upload";
import SignIn from "./SignIn";
import AppWriteUpload from "./AppWriteUpload";
import LatestUploads from "./LatestUploads";
import { account } from "./appwrite";
import { AuthProvider, AuthContext } from "./AuthContext";

export const notesData = createContext();

function App() {
  const [apiState, setApiState] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        console.error("User not logged in");
      } finally {
        setLoading(false);
      }
    }

    checkUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <notesData.Provider value={{ apiState, setApiState }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/subject" element={<Subject />} />
            <Route path="/lab" element={<Labs />} />
            <Route path="/about" element={<About />} />
            <Route path="/soon" element={<LatestUploads />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/proto" element={<AppWriteUpload />} />
            <Route path="/lg" element={<LatestUploads />} />
            <Route
              path="/upload"
              element={
                <AuthContext.Consumer>
                  {({ user, loading }) =>
                    loading ? (
                      <div>Loading...</div>
                    ) : user ? (
                      <Upload />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                </AuthContext.Consumer>
              }
            />
          </Routes>
        </BrowserRouter>
      </notesData.Provider>
    </AuthProvider>
  );
}

export default App;
