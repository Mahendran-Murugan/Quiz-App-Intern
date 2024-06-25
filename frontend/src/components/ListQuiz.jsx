import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export const ListQuiz = () => {
    const quizCount = 5;
    const quizStatus = quizCount > 0;
    const quizList = []
    for (let i = 0; i < quizCount; i++) {
        quizList.push(i);
    }
    return (
        <div className='flex flex-col justify-center items-center'>
            {(quizStatus && <h1>Welcome Students, These are {quizCount} quizes available </h1>) || <h1>Welcome Students, These are no available quizes</h1>}
            <div>
                {
                    quizList.map((quiz, index) => {
                        return <li key={index}><NavLink to={`${quiz}`}>{quiz}</NavLink></li>
                    })
                }
            </div>
        </div>
    )
}
