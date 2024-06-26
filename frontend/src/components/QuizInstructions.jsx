import React from 'react'
import { useNavigate } from 'react-router-dom'


export const QuizInstructions = () => {
    const navigate = useNavigate()
    const navToQuestions = () => {
        navigate('questions')
    }
    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h1>Read the Questions properly</h1>
            <button onClick={navToQuestions}>Contine</button>
        </div>
    )
}
