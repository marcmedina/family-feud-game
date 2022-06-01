import React from "react";
import { Button } from "antd";
import { FastForwardOutlined, CloseOutlined, EyeOutlined } from '@ant-design/icons';

interface ActionMenuProps {
  lastQuestion: boolean;
  onNextQuestion: () => void;
  onIncorrectGuess: () => void;
  onRevealAllAnswers: () => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onNextQuestion, onIncorrectGuess, lastQuestion, onRevealAllAnswers }) => {
  return (
    <div className="action-menu">
      <Button className="action-menu-item" type="primary" danger shape="circle" size="large" icon={<CloseOutlined />} onClick={onIncorrectGuess} />
      <Button className="action-menu-item" type="primary" shape="circle" size="large" icon={<EyeOutlined />} onClick={onRevealAllAnswers} />
      { !lastQuestion && <Button className="action-menu-item" type="primary" shape="circle" size="large" icon={<FastForwardOutlined />} onClick={onNextQuestion} /> }
    </div>
  );
};
