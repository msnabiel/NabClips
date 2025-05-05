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

// Define Question interface
interface Question {
  question: string;
  options: string[];
  answer: string;
}

// Type-safe shuffle function with generic parameter
const shuffleArray = <T,>(array: T[]): T[] => {
  // Create a copy of the array to avoid mutation
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const QuizApp = () => {
  const ALL_TOPICS = "All Topics";
  const actualTopics = Object.keys(questionsByTopic);
  const topics = [ALL_TOPICS, ...actualTopics];

  const [selectedTopic, setSelectedTopic] = useState<string>(ALL_TOPICS);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Move question generation to useEffect to ensure it only runs on the client
  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
    
    // Load saved topic from localStorage
    const savedTopic = localStorage.getItem("selectedTopic");
    if (savedTopic && topics.includes(savedTopic)) {
      setSelectedTopic(savedTopic);
    }

    // Initialize with empty quiz state
    resetQuizState();
  }, []);

  // Generate questions whenever the selected topic changes
  useEffect(() => {
    if (isClient) {
      generateQuestions();
    }
  }, [selectedTopic, isClient]);

  const generateQuestions = () => {
    let allQuestions: Question[] = [];

    if (selectedTopic === ALL_TOPICS) {
      actualTopics.forEach(topic => {
        allQuestions = [...allQuestions, ...(questionsByTopic[topic] || [])];
      });
    } else {
      allQuestions = questionsByTopic[selectedTopic] || [];
    }

    // Only shuffle on the client side
    const shuffledQuestions = shuffleArray(allQuestions);
    
    // Shuffle options for each question
    shuffledQuestions.forEach(question => {
      question.options = shuffleArray([...question.options]);
    });

    setQuestions(shuffledQuestions);
  };

  const resetQuizState = () => {
    setUserAnswers({});
    setShowAnswers(false);
    setScore(0);
    setSubmitted(false);
  };

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
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
  };

  const resetQuiz = () => {
    resetQuizState();
    generateQuestions();
  };

  const toggleShowAnswers = () => {
    setShowAnswers(prev => !prev);
  };

  const handleTopicChange = (topic: string) => {
    setSelectedTopic(topic);
    resetQuizState();
    localStorage.setItem("selectedTopic", topic);
  };

  // Show loading placeholder during SSR or before client hydration
  if (!isClient) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6 text-center">Loading Quiz...</h1>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Select your topic</h1>

          <div className="mb-8">
            <Select onValueChange={handleTopicChange} value={selectedTopic}>
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

              {questions.map((question, questionIndex) => (
                <Card key={questionIndex} className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                    <CardDescription className="text-base font-medium">
                      {question.question}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {question.options.map((option, optionIndex) => {
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

              {questions.length > 0 && !submitted ? (
                <Button
                  onClick={handleSubmit}
                  className="w-full"
                >
                  Submit Answers
                </Button>
              ) : questions.length > 0 && (
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