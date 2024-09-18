import { Link, useLocation } from "react-router-dom";
import { bgColors } from "../static/bgColors";
import QuestionCard from "../components/questionCard";

export default function Results() {
    const location = useLocation();
    const { state } = location;

    function calculateScore() {
        let score = 0;
        state.forEach((question) => {
            if (question.selectedAnswer === question.correctAnswer) {
                score += 1;
            }
          });
        return score;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Results</h1>
                {
                    state.map((answer, index) => <QuestionCard key={index} question={answer} >
                    </QuestionCard>)
                }
                <div className={`p-6 rounded-lg shadow-lg w-full mx-auto ${bgColors[calculateScore()].color} ${bgColors[calculateScore()].bgColor}`}>
                    <p className="text-center text-lg">
                        You scored <span className="font-bold text-3xl">{calculateScore()}</span> out of 5
                    </p>
                </div>
                <Link to='/'>
                    <button id="createQuizBtn" className="w-full bg-gray-500 text-white p-2 mt-4 rounded hover:bg-gray-600"
                    >
                        Create a new Quiz
                    </button>
                </Link>
            </div>
        </div>
    )
}
