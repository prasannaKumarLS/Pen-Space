import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./assets/signup";
import HomePage from "./assets/homePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
