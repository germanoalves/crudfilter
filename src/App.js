import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Home}  from "./pages/Home";
import { AddEdit } from "./pages/AddEdit";
import { View } from "./pages/View";
import { About } from "./pages/About";
import { Search } from "./pages/Search";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from './components/Header';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
              <ToastContainer position="top-center"/>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add" element={<AddEdit />} />
                  <Route path="/update/:id" element={<AddEdit />} />
                  <Route path="/view/:id" element={<View />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/search" element={<Search />} />
                </Routes>
      </div>
    </Router>

  );
}

export default App;
