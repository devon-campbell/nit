import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from "./components/navbar";
import Home from './pages/Home';
import Learn from './pages/Learn'; // import the component for /learn
import Play from './pages/Play';
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import Grad from "./pages/Grad";
import Start from "./pages/Start"; // import the component for /play

function App() {
  return (
    <Router>
      <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/play" element={<Play />} />
            <Route path="/lesson/:id" element={<Lesson />} />
            <Route path="/quiz/:id" element={<Quiz />} />
              <Route path="/grad" element={<Grad />} />
              <Route path="/start" element={<Start />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;