import React from "react";
import { Typography, Statistic } from "antd";

const { Title } = Typography;
const { Countdown } = Statistic;

interface QuestionProps {
  question: string;
  timerLengthSeconds: number;
  onTimerEnd: () =>  void;
}

export const Question: React.FC<QuestionProps> = ({ question, timerLengthSeconds, onTimerEnd }) => {
  const timerDeadline = Date.now() + 1000 * timerLengthSeconds;

  return (
    <div className="question-screen">
      <Title>{ question }</Title>
      <div className="question-timer">
        <Countdown value={timerDeadline} onFinish={onTimerEnd} format="mm:ss" />
      </div>
    </div>
  );
};
