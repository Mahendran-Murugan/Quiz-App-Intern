import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const Questions = () => {

    const questionCount = 10

    const navigate = useNavigate()

    const { quiz_id, question_id } = useParams()

    const intQuestionId = parseInt(question_id)

    const prevBtnStatus = intQuestionId > 1

    const nextBtnStatus = intQuestionId < questionCount

    const prevQuestion = () => {
        if (prevBtnStatus) navigate(`/quiz/${quiz_id}/${intQuestionId - 1}`, { replace: true })
    }

    const nextQuestion = () => {
        if (nextBtnStatus) navigate(`/quiz/${quiz_id}/${intQuestionId + 1}`, { replace: true })
    }

    return (
        <div className='h-screen flex flex-col justify-center items-center'>
            <h2>Questions: {question_id}</h2>
            <div>
                {prevBtnStatus && <button onClick={prevQuestion}>Prev</button>}
                {nextBtnStatus && <button onClick={nextQuestion}>Next</button>}
            </div>
        </div>
    )
}
