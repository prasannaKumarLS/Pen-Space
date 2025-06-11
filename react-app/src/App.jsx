import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import HomePage from "./pages/homePage";
import Dashboard from "./pages/dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
