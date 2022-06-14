import React, { useCallback } from "react";
import { Button } from "antd";
import { FastForwardOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';
import wrong from "../wrong.wav";
import reveal from "../reveal.wav";

interface ActionMenuProps {
  lastQuestion: boolean;
  onNextQuestion: () => void;
  onIncorrectGuess: () => void;
  onRevealAllAnswers: () => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onNextQuestion, onIncorrectGuess, lastQuestion, onRevealAllAnswers }) => {
  const handleIncorrectGuess = useCallback(() => {
    const wrongAudio = new Audio(wrong);
    wrongAudio.volume = .75;
    wrongAudio.play();
    onIncorrectGuess();
  }, [onIncorrectGuess]);

  const handleRevealAll = useCallback(() => {
    const revealAudio = new Audio(reveal);
    revealAudio.play();
    onRevealAllAnswers();
  }, [onRevealAllAnswers]);
  return (
    <div className="action-menu">
      <Button className="action-menu-item" type="primary" danger shape="circle" size="large" icon={<CloseOutlined />} onClick={handleIncorrectGuess} />
      <Button className="action-menu-item" type="primary" shape="circle" size="large" icon={<EyeOutlined />} onClick={handleRevealAll} />
      { !lastQuestion && <Button className="action-menu-item" type="primary" shape="circle" size="large" icon={<FastForwardOutlined />} onClick={onNextQuestion} /> }
    </div>
  );
};
