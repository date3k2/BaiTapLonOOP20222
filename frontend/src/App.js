import React from 'react'
import NavBar from './component/NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage/>} />
                <Route path='/edit' element={<EditPage />} />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
