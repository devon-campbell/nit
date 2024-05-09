import React, {useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Play from './pages/Play';
import Lesson from "./pages/Lesson";
import Quiz from "./pages/Quiz";
import Grad from "./pages/Grad";
import Start from "./pages/Start";
import Piano from "./pages/Piano";
import './App.css';
import NavbarComponent from "./components/NavbarComponent";

function App() {

  const [freakMode, setFreakMode] = useState(false);
  const toggleFreakMode = () => {
      setFreakMode(!freakMode);
  };

  return (
    <Router>
        <div className={`app ${freakMode ? 'freak-mode' : ''}`}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/learn" element={<Learn/>}/>
                <Route path="/play" element={<Play/>}/>
                <Route path="/lesson/:id" element={<Lesson/>}/>
                <Route path="/quiz/:id" element={<Quiz/>}/>
                <Route path="/grad" element={<Grad/>}/>
                <Route path="/start" element={<Start/>}/>
                <Route path="/piano" element={<Piano/>}/>
            </Routes>
        </div>
    </Router>
  );
}

export default App;