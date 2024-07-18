import React, { useState, useEffect } from 'react';
import './App.css';

// Sample questions
const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris'
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    answer: 'Harper Lee'
  },
  {
    question: 'What is the smallest planet in our solar system?',
    options: ['Earth', 'Mars', 'Mercury', 'Venus'],
    answer: 'Mercury'
  },
  {
    question: 'Which element has the chemical symbol O?',
    options: ['Oxygen', 'Gold', 'Silver', 'Osmium'],
    answer: 'Oxygen'
  },
  {
    question: 'In what year did the Titanic sink?',
    options: ['1912', '1905', '1898', '1918'],
    answer: '1912'
  },
  {
    question: 'What is the hardest natural substance on Earth?',
    options: ['Diamond', 'Gold', 'Iron', 'Platinum'],
    answer: 'Diamond'
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: ['Leonardo da Vinci', 'Vincent van Gogh', 'Pablo Picasso', 'Claude Monet'],
    answer: 'Leonardo da Vinci'
  },
  {
    question: 'What is the capital city of Japan?',
    options: ['Tokyo', 'Beijing', 'Seoul', 'Bangkok'],
    answer: 'Tokyo'
  },
  {
    question: 'How many continents are there on Earth?',
    options: ['5', '6', '7', '8'],
    answer: '7'
  },
  {
    question: 'What is the boiling point of water?',
    options: ['100°C', '90°C', '110°C', '95°C'],
    answer: '100°C'
  }
];

function App() {

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);


  const resetGame = () => {
    const shuffled = questions.sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setWrongAnswers([]);
    setIsQuizComplete(false);
  };

  const handleAnswerClick = (option) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    } else {
      setWrongAnswers([...wrongAnswers, currentQuestion]);
    }
    setShowAnswer(true);
    setTimeout(() => {
      if (currentQuestionIndex < shuffledQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowAnswer(false);
      } else {
        setIsQuizComplete(true);
      }
    }, 2000);
  };

  if (isQuizComplete) {
    return (
      <div className="App">
        <h1>Quiz Complete!</h1>
        <p className='total-score'>Your score: {score}</p>
        {wrongAnswers.length > 0 && (
          <div>
            <h2 className='wrong-ans'>Wrong Answers:</h2>
            <ul>
              {wrongAnswers.map((question, index) => (
                <li key={index}>
                  <p>{question.question}</p>
                  <p className='correct-ans'>Correct Answer: {question.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className='reset-btn' onClick={resetGame}>Reset Game</button>
      </div>
    );
  }
  return (
    <div className="App">
      <h1>Quiz Application</h1>
      <p className='current-score'>Current Score : {score}</p>
      {shuffledQuestions.length > 0 && (
        <div className='main-container'>
          <p className='q'>
            Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
          </p>
          <h3>{shuffledQuestions[currentQuestionIndex].question}</h3>
          <div className='ans'>
            {shuffledQuestions[currentQuestionIndex].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option)}
                disabled={showAnswer}
                className='ans-btn'
              >
                {option}
              </button>
            ))}
          </div>
          {showAnswer && (
            <p className='correct-ans-show'>Correct Answer: {shuffledQuestions[currentQuestionIndex].answer}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;


