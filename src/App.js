import React from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import ProtectedRout from "./components/common/protectedRoute";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import LogOut from "./layouts/logOut";

function App() {
  return (
    <div>
      <AuthProvider>
        <Navbar />
        <QualitiesProvider>
          <ProfessionProvider>
            <Routes>
              <Route
                path="/users/:userId?/:edit?"
                element={
                  <React.Fragment>
                    <ProtectedRout>
                      <Users />
                    </ProtectedRout>
                  </React.Fragment>
                }
              />
              <Route path="/login/:type?" element={<Login />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="/" element={<Main />} />
            </Routes>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
