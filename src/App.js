import React, { useEffect } from "react";
import Users from "./layouts/users";
import Navbar from "./components/ui/navBar";
import { Route, Routes } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
import ProtectedRout from "./components/common/protectedRoute";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionList } from "./store/profession";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionList());
  }, []);

  return (
    <div>
      <AuthProvider>
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
      </AuthProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
