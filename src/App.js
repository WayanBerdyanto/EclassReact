import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import StudentList from "./Pages/StudentList";
import NavbarComponent from "./Components/Navbar";
import { LoadingProvider, useLoading } from "./Components/LoadingContext";
import { LoadingState } from "./Components/LoadingContext";
import styles from './LoadingWrapper.module.css';
function App() {
  return (
    <LoadingProvider>
      <BrowserRouter>
        <NavbarComponent />
        <LoadingWrapper>
          <Routes>
            <Route index path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
        </LoadingWrapper>
      </BrowserRouter>
    </LoadingProvider>
  );
}

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
