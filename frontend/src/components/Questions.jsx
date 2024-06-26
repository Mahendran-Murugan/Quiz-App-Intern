import React from 'react'
import { SingleQuestion } from './SingleQuestion'

export const Questions = () => {

    const sampleData = [
        {
            "id": 10,
            "quizid": 29,
            "question": "what is your name",
            "ch1": "hello",
            "ch2": "hello",
            "ch3": "hello",
            "ch4": "hello",
            "answer": "hello",
            "image": "none",
            "points": 10
        },
        {
            "id": 11,
            "quizid": 29,
            "question": "what is your petname",
            "ch1": "hello",
            "ch2": "hello",
            "ch3": "hello",
            "ch4": "hello",
            "answer": "hello",
            "image": "none",
            "points": 10
        },
        {
            "id": 12,
            "quizid": 29,
            "question": "what is your nickname",
            "ch1": "hello",
            "ch2": "hello",
            "ch3": "hello",
            "ch4": "hello",
            "answer": "hello",
            "image": "none",
            "points": 10
        }
    ]

    return (
        <div>
            {sampleData.map((question, index) => {
                return <SingleQuestion index={index} question={question} />
            })}
        </div>
    )
}
