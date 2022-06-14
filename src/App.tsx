import React, { useState, useCallback, useEffect } from 'react';
import logo from './logo.png';
import './App.less';
import gameSettings from './game.json';

import { AnswerBoard } from './components/AnswerBoard';
import { ActionMenu } from './components/ActionMenu';
import { Question } from './components/Question';

import video from "./background.mp4";

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

  const handleAnswerReveal = useCallback((answerIndex: number, hide: boolean = false) => {
    console.log("score", score);
    console.log("new score", score + answerSet[answerIndex].points);

    const newAnswerSet = [...answerSet];
    newAnswerSet[answerIndex].revealed = !hide;
    setAnswerSet(newAnswerSet);
    setScore(hide === false
      ? score + newAnswerSet[answerIndex].points
      : score - newAnswerSet[answerIndex].points
    );
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

  const handleIncorrectGuess = useCallback(() => {
    setIncorrectResponses(incorrectResponses + 1);
  }, [incorrectResponses]);

  const handleRemoveIncorrectGuess = useCallback(() => {
    if (incorrectResponses > 0) {
      setIncorrectResponses(incorrectResponses - 1);
    }
  }, [incorrectResponses]);

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
            {questionTimerActive
              ? 
                <Question 
                  question={questionSet[currentQuestion].question}
                  timerLengthSeconds={gameSettings.questionTimerSeconds}
                  onTimerEnd={handleTimerEnd}
                />
              :
              <AnswerBoard
                score={score}
                question={questionSet[currentQuestion].question}
                answerList={answerSet}
                incorrectGuesses={incorrectResponses}
                onRevealAnswer={handleAnswerReveal}
                onRemoveIncorrectGuess={handleRemoveIncorrectGuess}
              />
            }
            <ActionMenu
              lastQuestion={isLastQuestion}
              onNextQuestion={handleNextQuestion} 
              onIncorrectGuess={handleIncorrectGuess}
              onRevealAllAnswers={handleRevealAllAnswers}
            /> 
          </>
          
        : <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <a onClick={() => setGameStarted(true)}>Start Game</a> 
          </header>
      }
      <video autoPlay muted loop className="background-video">
        <source src={video} type="video/mp4" />
      </video>                     
    </div>
  );
}

export default App;
