import React from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import ProtectedRout from "./components/common/protectedRoute";
import { ToastContainer } from "react-toastify";
import LogOut from "./layouts/logOut";
import AuthLoader from "./components/ui/hoc/authLoader";

function App() {
  return (
    <div>
      <AuthLoader>
        <Navbar />
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
      </AuthLoader>
      <ToastContainer />
    </div>
  );
}

export default App;
