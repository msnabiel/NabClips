"use client";

import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { questionsByTopic } from "../../../data/sts302p";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * QuizApp is a functional component that renders a quiz application.
 * It allows users to select a topic, answer questions, and see their score.
 * 
 * State:
 * - selectedTopic: The topic selected by the user.
 * - userAnswers: An object storing user's answers to the questions.
 * - showAnswers: A boolean indicating if the answers should be shown.
 * - score: The user's score based on correct answers.
 * - submitted: A boolean indicating if the quiz has been submitted.
 * 
 * Effects:
 * - Resets the quiz state whenever a new topic is selected.
 * 
 * Handlers:
 * - handleAnswerChange: Updates user's answer for a given question.
 * - handleSubmit: Calculates score and marks the quiz as submitted.
 * - resetQuiz: Resets the quiz to its initial state.
 * - toggleShowAnswers: Toggles the visibility of the correct answers.
 * 
 * UI:
 * - Displays a dropdown to select a topic.
 * - Renders questions and options based on the selected topic.
 * - Shows quiz results and feedback after submission.
 */

/*******  ac66a984-4220-4f52-9917-f3f7ddee41b7  *******/
const QuizApp = () => {
  const actualTopics = Object.keys(questionsByTopic); // Original topics
  const ALL_TOPICS = "All Topics"; // Constant for "All Topics" option
  const topics = [ALL_TOPICS, ...actualTopics];

  const [selectedTopic, setSelectedTopic] = useState<string>(actualTopics[0] || '');
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Get questions based on selected topic
  // Define the Question type interface
interface Question {
  question: string;
  options: string[];
  answer: string;
}

const getQuestions = (): Question[] => {
    if (selectedTopic === ALL_TOPICS) {
      // Combine all questions from all topics
      let allQuestions: Question[] = [];
      actualTopics.forEach(topic => {
        allQuestions = [...allQuestions, ...questionsByTopic[topic]];
      });
      return allQuestions;
    }
    return questionsByTopic[selectedTopic] || [];
  };

  useEffect(() => {
    setUserAnswers({});
    setShowAnswers(false);
    setScore(0);
    setSubmitted(false);
  }, [selectedTopic]);

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Updates the user's answer for a specific question.
 *
 * @param questionIndex - The index of the question being answered.
 * @param answer - The answer provided by the user.
 * 
 * This function will not update the answer if the quiz has already been submitted.
 */

/*******  4c730eaa-82bf-4c86-bed2-8d17bb637a4b  *******/
  const handleAnswerChange = (questionIndex: number, answer: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const handleSubmit = () => {
    if (!selectedTopic) return;

    let correctCount = 0;
    const questions = getQuestions();

    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setUserAnswers({});
    setShowAnswers(false);
    setScore(0);
    setSubmitted(false);
  };
  
  const toggleShowAnswers = () => {
    setShowAnswers(prev => !prev);
  };

  const questions = getQuestions();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Select your topic</h1>

          <div className="mb-8">
          <Select onValueChange={setSelectedTopic} value={selectedTopic}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {topics.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          </div>

          {selectedTopic && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{selectedTopic}</h2>
                <div className="space-x-2">
                  <Button variant="outline" onClick={toggleShowAnswers}>
                    {showAnswers ? "Hide Answers" : "Show Answers"}
                  </Button>
                  {submitted && (
                    <Button variant="outline" onClick={resetQuiz}>
                      Reset Quiz
                    </Button>
                  )}
                </div>
              </div>

              {submitted && (
                <Card className="mb-6 bg-slate-50">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      Quiz Results
                      {score === questions.length && (
                        <CheckCircle2 className="ml-2 text-green-500" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      You got {score} out of {questions.length} questions correct.
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}

              {questions.map((question: Question, questionIndex: number) => (
                <Card key={questionIndex} className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {question.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {question.options.map((option: string, optionIndex: number) => {
                      const isSelected = userAnswers[questionIndex] === option;
                      const isCorrect = submitted && option === question.answer;
                      const isWrong = submitted && isSelected && !isCorrect;

                      return (
                        <Card
  key={optionIndex}
  className={`cursor-pointer p-4 transition border ${
    isCorrect
      ? "border-green-600 bg-green-50 text-green-800"
      : isWrong
      ? "border-red-600 bg-red-50 text-red-800"
      : isSelected
      ? "border-blue-600 bg-blue-50 text-blue-800"
      : ""
  }`}
  onClick={() => handleAnswerChange(questionIndex, option)}
>
                          <div className="flex items-center justify-between">
                            <span>{option}</span>
                            {submitted && isCorrect && (
                              <CheckCircle2 className="text-green-600 w-5 h-5" />
                            )}
                            {submitted && isWrong && (
                              <AlertCircle className="text-red-600 w-5 h-5" />
                            )}
                          </div>
                        </Card>
                      );
                    })}

                    {showAnswers && (
                      <div className="mt-4 p-3 bg-slate-50 rounded-md">
                        <p className="font-medium text-green-600">
                          Answer: {question.answer}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {!submitted ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Submit Answers
                </Button>
              ) : (
                <Button
                  onClick={resetQuiz}
                  className="w-full"
                  variant="outline"
                >
                  Reset Quiz
                </Button>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuizApp;