import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Subject from "./Subject";
import Labs from "./Labs";
import About from "./About";
import Roles from "./Roles";
import SignIn from "./SignIn";
import MyUploads from "./MyUploads";
import AppWriteUpload from "./AppWriteUpload";
import LatestUploads from "./LatestUploads";
import { AuthProvider, AuthContext } from "./AuthContext";
import Assignement from "./Assignment";
import LeaderBoard from "./LeaderBoard";
import CodeGuide from "./CodeGuide";

export const notesData = createContext();

function App() {
  const [apiState, setApiState] = useState("");

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
            <Route path="/assignment" element={<Assignement />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/lg" element={<LatestUploads />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/code" element={<CodeGuide />} />
            <Route
              path="/upload"
              element={
                <AuthContext.Consumer>
                  {({ user, loading }) =>
                    loading ? (
                      <div>Loading...</div>
                    ) : user ? (
                      <AppWriteUpload />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                </AuthContext.Consumer>
              }
            />
            <Route
              path="/myuploads"
              element={
                <AuthContext.Consumer>
                  {({ user, loading }) =>
                    loading ? (
                      <div>Loading...</div>
                    ) : user ? (
                      <MyUploads />
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
