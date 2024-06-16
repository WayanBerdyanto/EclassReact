import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard";
import StudentList from "./Pages/StudentList";
import NavbarComponent from "./Components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/students" element={<StudentList />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
