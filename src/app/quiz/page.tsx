"use client";

import { setQuizMetadata } from "@/actions/_quiz";
import { Button, buttonVariants } from "@/components/ui/button";
import questions from "@/lib/quiz"; // Adjust the import path as necessary
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  useEffect(() => {
    if (isQuizStarted && timeLeft === 0) {
      handleNextQuestion();
    }

    if (isQuizStarted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isQuizStarted]);

  const handleAnswer = (answer: string) => {
    if (questions[currentQuestionIndex].correctAnswer === answer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    setTimeLeft(30);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsQuizFinished(true);
      setQuizMetadata({ quizTaken: true, quizPassed: score >= 8 });
    }
  };

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  if (!isQuizStarted) {
    return (
      <div className="container">
        <h1 className="text-3xl text-center font-bold my-6">
          Quiz Instructions
        </h1>
        <p className="mx-auto max-w-sm mb-4">
          You must pass this quiz with an 80% or better to access this
          application. You only get one try. You'll have 30 seconds per
          question. If you navigate off this website during the quiz, you will
          automatically fail (so no cheating!).
        </p>
        <Button className="mx-auto block" onClick={handleStartQuiz}>
          Start Quiz
        </Button>
      </div>
    );
  }

  if (isQuizFinished) {
    const passScore = Math.ceil(questions.length * 0.8);
    const isPassed = score >= passScore;

    return (
      <div className="container max-w-sm flex-flex-col items-start">
        <h1>Quiz Finished</h1>
        <p>
          Your score: {score} / {questions.length}
        </p>
        {isPassed ? (
          <p>Congratulations! You passed the quiz.</p>
        ) : (
          <p>Sorry, you did not pass the quiz.</p>
        )}

        <Link className={cn(buttonVariants(), "my-4")} href="/">
          Go to Home
        </Link>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="container flex flex-col items-start max-w-sm">
      <p className="italic self-start mb-4">Time left: {timeLeft} seconds</p>
      <h2 className="font-bold">{currentQuestion.question}</h2>
      <ul>
        {currentQuestion.options.map((option) => (
          <li key={option}>
            <Button
              variant="outline"
              className="my-2"
              onClick={() => handleAnswer(option)}
            >
              {option}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Quiz;
