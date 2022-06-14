import React, { useCallback } from "react";
import { Button, Statistic } from "antd";
import { CloseOutlined } from '@ant-design/icons';
import { AnswerListItem } from "../App";
import correct from "../correct.wav";

interface AnswerBoardProps {
  question: string;
  answerList: AnswerListItem[];
  score: number;
  incorrectGuesses: number;
  onRevealAnswer: (answerIndex: number, hide?: boolean) => void;
  onRemoveIncorrectGuess: () => void;
}

type AnswerItem = AnswerListItem & Pick<AnswerBoardProps, "onRevealAnswer"> & { index: number };

export const AnswerBoard: React.FC<AnswerBoardProps> = ({ question, answerList, score, onRevealAnswer, incorrectGuesses, onRemoveIncorrectGuess }) => {
  const answers = answerList.map((props, index) => 
    <AnswerCard 
      key={`answer-${index}`} {...props} 
      onRevealAnswer={onRevealAnswer} 
      index={index} 
    />
  );

  return (
    <div className="answer-board">
      <div className="question">{ question }</div>
      <div className="score">
        <div className="scoreboard">
        <Statistic title="Score" value={score} />
        </div>
      </div>
      <div className="counter">
        <span>
          { Array.from(new Array(incorrectGuesses)).map((_, index) => <CloseOutlined style={{ fontSize: '50px', color: '#ff0000' }} key={index} onClick={onRemoveIncorrectGuess} />)}
        </span>
      </div>
      { answers }
    </div>
  )
};

const AnswerCard: React.FC<AnswerItem> = ({ answer, revealed, points, onRevealAnswer, index}) => {
  const toggleReveal = useCallback(() => {
    const revealSound = new Audio(correct);
    revealSound.volume = .5;
    revealSound.play();
    onRevealAnswer(index, false);
  }, [index, onRevealAnswer]);

  const toggleHide = useCallback(() => {
    onRevealAnswer(index, true);
  }, [index, onRevealAnswer]);

  return (
    <div className="answer-item">
      { revealed
        ? <Button className="answered" type="primary" onClick={toggleHide}>
            {answer}
            <span className="answer-point">{points}</span>
          </Button>
        : <Button type="primary" block onClick={toggleReveal}>
            <span className="answer-index">{ index + 1 }</span>
          </Button>
      }
    </div>
  )
};
