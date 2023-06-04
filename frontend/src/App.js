import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import HomePage from './pages/HomePage';
import QuestionPage from './pages/Question/QuestionPage';
import CategoryPage from './pages/CategoryPage';
import ExamPage from './pages/ExamPage';
import ImportPage from './pages/ImportPage';
import ExportPage from './pages/ExportPage';
import EditQuestionPage from './pages/Question/EditQuestionPage';
import AddQuizPage from './pages/Quiz/AddQuizPage';
import EditQuizPage from './pages/Quiz/EditQuizPage/EditQuizPage';
import QuizPage from './pages/Quiz/QuizPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<HomePage/>} />
          <Route path='/question' element={<QuestionPage />} />
          <Route path='/category' element={<CategoryPage />} />
          <Route path='/import' element={<ImportPage />} />
          <Route path='/export' element={<ExportPage />} />
          <Route path='/question/edit' element={<EditQuestionPage />}/>
          <Route path='/quiz/add' element={<AddQuizPage /> }/>
          <Route path='/:quizName/edit' element={<EditQuizPage />}/>
          <Route path='/:quizName' element={<QuizPage />} />
        </Route>
        <Route path='/exam' element={<ExamPage />} />
      </Routes>
    </BrowserRouter>
  )
}