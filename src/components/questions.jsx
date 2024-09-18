import { useEffect, useState } from "react";
import QuestionCard from "./questionCard";
import { Link, useNavigate } from "react-router-dom";
import { decodeHtmlEntities } from "../utilities/parser";

export default function Questions({ category, difficulty }) {
    const [questions, setQuestions] = useState([]);
    const [isCompleted, setIsCompleted] = useState(false);

    const navigate = useNavigate();

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        async function fetchQuestions() {
            const response = await fetch(
                `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
            );
            const data = await response.json();
            if (data.results) {
                const formattedQuestions = data.results.map((questionItem) => {
                    const options = shuffleArray([
                        ...questionItem.incorrect_answers,
                        questionItem.correct_answer,
                    ]);
                    return {
                        question: decodeHtmlEntities(questionItem.question),
                        correctAnswer: questionItem.correct_answer,
                        options: options,
                        selectedAnswer: null
                    };
                });
                setQuestions(formattedQuestions);
                setIsCompleted(false);
            }
        }

        fetchQuestions();
    }, [category, difficulty]);

    function onHandleClickAnswer(question, option) {
        let updatedQuestions = questions.map(questionItem => {
            if (questionItem.question === question) {
                return { 
                    ...questionItem, 
                    selectedAnswer: option 
                };
            }
            return questionItem;
        })
        setQuestions(updatedQuestions);
        
        // Count the answered questions
        const answeredQuestions = updatedQuestions.filter(q => q.selectedAnswer !== null).length;
        setIsCompleted(answeredQuestions === questions.length);
        
    }

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <>
            {
                questions.map((question, index) => <QuestionCard
                    key={index}
                    question={question}
                    handleClickAnswer={(question, option) => onHandleClickAnswer(question, option)}
                />)
            }
            {isCompleted &&
                <button id="submitBtn" className="w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                    onClick={() => navigate('/results', { state: questions })}
                >
                    Submit
                </button>}
        </>

    )
}