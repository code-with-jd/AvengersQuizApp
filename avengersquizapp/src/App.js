import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage";
import Success from "./pages/successPage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
