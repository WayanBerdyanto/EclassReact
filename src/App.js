import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import StudentList from "./Pages/StudentList";
import NavbarComponent from "./Components/Navbar";
import LoginPage from "./Pages/Login";
import { LoadingProvider, useLoading } from "./Components/LoadingContext";
import { LoadingState } from "./Components/LoadingContext";
import { AuthProvider, useAuth } from "./Components/AuthContext";
import styles from "./LoadingWrapper.module.css";
import PrivateRoute from "./Components/PrivateRoute";
import Register from "./Pages/Register";
import Lecturers from "./Pages/Lecturer";

function App() {
  return (
    <AuthProvider>
      <LoadingProvider>
        <BrowserRouter>
          <MainContent />
        </BrowserRouter>
      </LoadingProvider>
    </AuthProvider>
  );
}

const MainContent = () => {
  const location = useLocation();
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingState type={"bars"} color={"#fff"} />
      </div>
    );
  }

  return (
    <>
      {location.pathname !== "/" &&location.pathname !== "/register" && isAuthenticated && <NavbarComponent />}
      <LoadingWrapper>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="/students"
            element={<PrivateRoute element={<StudentList />} />}
          />
          <Route
            path="/lecturers"
            element={<PrivateRoute element={<Lecturers />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </LoadingWrapper>
    </>
  );
};

const LoadingWrapper = ({ children }) => {
  const { loading } = useLoading();
  return (
    <>
      {loading && (
        <div className={styles.loadingContainer}>
          <LoadingState type={"bars"} color={"#fff"} />
        </div>
      )}
      {children}
    </>
  );
};

export default App;
