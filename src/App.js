import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Results from './pages/results-page';
import Quiz from './pages/quiz-page';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-6">
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/quiz-maker" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
