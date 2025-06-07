import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./assets/signup";
import HomePage from "./assets/homePage";
import "./App.css";
import NoteTile from "./assets/components/noteTile";
import RichTextEditor from "./assets/components/richTextEditor";

function App() {
  const data = {
    title: "Prasanna's Draft",
    category: "Draft Notes",
    modifiedOn: "Today, 12:50",
    summary:
      "Flexbox is a modern, powerful way to build responsive, aligned layouts in CSS. With just a few lines of CSS, you can do complex layouts that used to require hacks.",
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/rte" element={<RichTextEditor />} />
        <Route
          path="/card"
          element={
            <NoteTile
              title={data.title}
              category={data.category}
              modifiedOn={data.modifiedOn}
              summary={data.summary}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
