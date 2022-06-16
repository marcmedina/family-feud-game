import React, { useState, useCallback, useEffect } from "react";
import { Typography, Statistic, Button } from "antd";

const { Title } = Typography;
const { Countdown } = Statistic;

interface QuestionProps {
  question: string;
  timerLengthSeconds: number;
  onTimerEnd: () =>  void;
  timerDelaySeconds?: number;
}

export const Question: React.FC<QuestionProps> = ({ question, timerLengthSeconds, onTimerEnd, timerDelaySeconds }) => {
  const [timerStarted, setTimerStarted] = useState(false);
  const timerDeadline = Date.now() + 1000 * (timerLengthSeconds + 1);
  const handleStartTimer = useCallback(() => {
    setTimerStarted(true);
  }, []);

  useEffect(() => {
    if (timerStarted) {
      return;
    }

    if (!timerDelaySeconds) {
      return setTimerStarted(true);
    }

    setTimeout(() => {
      setTimerStarted(true);
    }, timerDelaySeconds * 1000);
  }, [timerDelaySeconds, timerStarted]);

  return (
    <div className="question-screen">
      { timerStarted &&
        <div className="question-timer">
          <Countdown value={timerDeadline} onFinish={onTimerEnd} format="mm:ss" />
        </div>
      }
      <Title onClick={handleStartTimer}>{ question }</Title>
    </div>
  );
};
