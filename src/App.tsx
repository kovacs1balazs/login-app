import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { LoginForm } from './loginForm.tsx';
import { SuccessPage } from './successPage.tsx';

function App() {
  return (
    <Router basename='/login-app'>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
    </Router>
  );
}

export default App;
