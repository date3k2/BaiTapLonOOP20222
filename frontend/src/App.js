import React from 'react'
import NavBar from './component/NavBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import EditPage from './pages/EditPage';
import QuestionPage from './pages/QuestionPage';
import CategoryPage from './pages/CategoryPage';
import ExamPage from './pages/ExamPage';
import ImportPage from './pages/ImportPage';
import ExportPage from './pages/ExportPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage/>} />
            <Route path='/edit' element={<EditPage />} />
            <Route path='/question' element={<QuestionPage />} />
            <Route path='/category' element={<CategoryPage />} />
            <Route path='/import' element={<ImportPage />} />
            <Route path='/export' element={<ExportPage />} />
          </Route>
        <Route path='/exam' element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  )
}
