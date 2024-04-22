import React from "react";
import "./App.css";
import GitHubRepo from "./component/repo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RepoData from "./component/repoData";
import ErrorBoundary from "./component/ErrorBoundary";
import NotFound from "./component/404";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<GitHubRepo />} />
          <Route path="/repository/:id" element={<RepoData />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
