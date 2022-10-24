import React from "react";
import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App" data-testid="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/:id"
              element={
                <>
                  <Detail />
                </>
              }
            />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
