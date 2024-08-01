import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetailsPage from "./components/TaskDetailsPage";
import Main from "./components/Main";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/task/:taskId" element={<TaskDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
