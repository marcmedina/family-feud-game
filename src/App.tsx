import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.png';
import './App.less';
import gameSettings from './game.json';

import { AnswerBoard } from './components/AnswerBoard';
import { ActionMenu } from './components/ActionMenu';
import { Question } from './components/Question';

export interface GameBoardState {
  currentQuestion: number;
  score: number;
  incorrectResponses: number;
  answers: AnswerListItem[];
}

export interface AnswerListItem {
  answer: string;
  points: number;
  revealed?: boolean;
}

function App() {
  const [gameStarted, setGameStarted]  = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrectResponses, setIncorrectResponses] = useState(0);
  const [answerSet, setAnswerSet] = useState<AnswerListItem[]>([]);
  const [questionTimerActive, setQuestionTimerActive] = useState(false);
  const lastQuestionIndex = gameSettings.questions.length - 1;
  const isLastQuestion = currentQuestion >= lastQuestionIndex;
  const questionSet = gameSettings.questions;

  const handleAnswerReveal = useCallback((answerIndex: number) => {
    const newAnswerSet = [...answerSet];
    newAnswerSet[answerIndex].revealed = true;
    setAnswerSet(newAnswerSet);
    setScore(score + newAnswerSet[answerIndex].points);
  }, [answerSet, score]);

  const handleRevealAllAnswers = useCallback(() => {
    setAnswerSet(answerSet.map(answer => ({...answer, revealed: true})));
  }, [answerSet]);

  const handleNextQuestion = useCallback(() => {
    setCurrentQuestion(currentQuestion + 1);
    setScore(0);
    setIncorrectResponses(0);
    setQuestionTimerActive(true);
  }, [currentQuestion]);

  const handleTimerEnd = useCallback(() => {
    setQuestionTimerActive(false);
  }, []);

  useEffect(() => {
    setAnswerSet([...gameSettings.questions[currentQuestion].answers]);
  }, [currentQuestion]);

  useEffect(() => {
    setQuestionTimerActive(true);
  }, [gameStarted]);

  return (
    <div className="App">
      { gameStarted 
        ?
          <>
            {questionTimerActive && 
              <Question 
                question={questionSet[currentQuestion].question}
                timerLengthSeconds={gameSettings.questionTimerSeconds}
                onTimerEnd={handleTimerEnd}
              />
            }
            <ActionMenu
              lastQuestion={isLastQuestion}
              onNextQuestion={handleNextQuestion} 
              onIncorrectGuess={() => setIncorrectResponses(incorrectResponses + 1)}
              onRevealAllAnswers={handleRevealAllAnswers}
            /> 
            <AnswerBoard
              score={score}
              question={questionSet[currentQuestion].question}
              answerList={answerSet}
              incorrectGuesses={incorrectResponses}
              onRevealAnswer={handleAnswerReveal}
            />
            
          </>
          
        : <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a onClick={() => setGameStarted(true)}>Start Game</a> 
          </header>
      }
    
    </div>
  );
}

export default App;
