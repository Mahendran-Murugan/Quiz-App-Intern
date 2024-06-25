import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Register } from './components/Register'
import { Admin } from './components/Admin'
import { Student } from './components/Student'
import { Quiz } from './components/Quiz'
import { ListQuiz } from './components/ListQuiz'
import { Questions } from './components/Questions'
import { QuizInstructions } from './components/QuizInstructions'


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/quiz" element={<Quiz />}>
          <Route index element={<ListQuiz />} />
          <Route path=':quiz_id'>
            <Route index element={<QuizInstructions />} />
            <Route path=':question_id' element={<Questions />} />
          </Route>
        </Route>
      </Routes>
    </div >
  )
}