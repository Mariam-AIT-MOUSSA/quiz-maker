import { useLocation } from "react-router-dom";

export default function QuestionCard({ question, handleClickAnswer }) {

  const location = useLocation();
  const inResultPage = location.pathname.includes('results');

  return (
    <div className="p-4 bg-white rounded shadow-md mb-4">
      <h2 className="mb-2">{question.question}</h2>
      <div>
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              handleClickAnswer(question.question, option)
            }}
            className={`block w-full p-2 my-2 rounded 
                  ${question.selectedAnswer === option ? 'bg-green-500 text-white' : 'bg-gray-200'} 
                  ${!inResultPage && 'hover:bg-green-400'}
                  ${(inResultPage && (question.correctAnswer === option)) && 'bg-green-500 text-white'}
                  ${(inResultPage && (question.selectedAnswer === option) && (question.selectedAnswer !== question.correctAnswer)) && 'bg-red-500 text-white'}
                  `
            }
            disabled={inResultPage}
          >
            {option}
          </button>
        ))}
      </div>

    </div>
  );
}