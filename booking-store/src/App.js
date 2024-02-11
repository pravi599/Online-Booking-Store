import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Menu from './components/Menu';
import './App.css';
import React from 'react';
import axios from 'axios';
import AddBook from './components/AddBook';
import Books from './components/Books';
import UpdateDelete from './components/UpdateDeleteBook';
import GetAllBooks from './components/GetAllBooks';
import Home from './components/Home';



const access_token = localStorage.getItem("token");
axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route path='/Login' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/AddBook" element={<AddBook />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/GetAllBooks" element={<GetAllBooks />} />
          <Route path="/Update,DeleteBooks" element={<UpdateDelete />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;