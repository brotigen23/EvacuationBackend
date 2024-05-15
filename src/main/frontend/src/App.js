import './App.css';
import React from 'react';
import Index from './pages/Index';
import Tests from './pages/Tests';
import Test from './pages/Test';
import Map from './pages/Map';
import Articles from './pages/Articles';
import Article from './pages/Article';

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/navbar/NavBar';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>

        <Route path='/' Component={Index} />  

        <Route path='/articles' Component={Articles} />
        
        <Route path='/articles/:id' Component={Article} />

        <Route path='/tests' Component={Tests} />

        <Route path='/tests/:id' Component={Test} />

        <Route path='/map' Component={Map} />

      </Routes>
    </Router>
  );
}

export default App;
