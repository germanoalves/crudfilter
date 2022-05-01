import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AddEdit } from "./pages/AddEdit";
import { View } from "./pages/View";
import { Help } from "./pages/Help";
import { Search } from "./pages/Search";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "./components/Header";
import { RequireAuth } from "./pages/RequireAuth";
import { Login } from "./pages/Login";
import { Teste } from "./pages/Teste";


function App() {
 
  return (
    
    <Router>   
      <div className="App">
        <Header />      
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="*" element={<Login />} />
          <Route exact path="/" element={<Login/>}></Route>
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/add" element={<RequireAuth><AddEdit /></RequireAuth>} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/help" element={<RequireAuth><Help /></RequireAuth>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// https://dev.to/iamandrewluca/private-route-in-react-router-v6-lg5