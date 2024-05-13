import './App.css';
import React from 'react';
import Main from './pages/Main';
import Tests from './pages/Tests';
import Map from './pages/Map';
import Articles from './pages/Articles';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        <Route path='/' Component={Main} />

        <Route path='/articles' Component={Articles} />

        <Route path='/tests' Component={Tests} />

        <Route path='/map' Component={Map} />

      </Routes>
    </Router>
  );
}

export default App;
