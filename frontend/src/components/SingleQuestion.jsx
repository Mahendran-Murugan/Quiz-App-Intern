import React, { useEffect, useState } from 'react'
import { SingleChoice } from './SingleChoice'

export const SingleQuestion = ({ question, index }) => {
    const [choices, setChoice] = useState([])
    useEffect(() => {
        const ch1 = question.ch1;
        const ch2 = question.ch2;
        const ch3 = question.ch3;
        if (question.ch1) setChoice((prev) => [...prev, ch1])
        if (question.ch2) setChoice((prev) => [...prev, ch2])
        if (question.ch3) setChoice((prev) => [...prev, ch3])
        console.log(choices)
    }, [])
    return (
        <div>
            <p>{`${index + 1}. ${question.question}`}</p>
            <ul>
                {choices.map((choice, index) => {
                    return <SingleChoice key={index} choice={choice} />
                })}
            </ul>
        </div>
    )
}
