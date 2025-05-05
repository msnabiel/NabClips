"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { questionsByTopic } from "../../data/sts302p";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Question {
  question: string;
  options: string[];
  answer: string;
}

const QuizApp = () => {

  const actualTopics = Object.keys(questionsByTopic);

  const [name, setName] = useState("");
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const questions: Question[] = actualTopics.flatMap(
    (topic) => questionsByTopic[topic]
  );

  // Timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!submitted && name) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [submitted, name]);

  const handleAnswerChange = (index: number, answer: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [index]: answer }));
  };const handleSubmit = async () => {
    try {
      let correct = 0;
      questions.forEach((q, i) => {
        if (userAnswers[i] === q.answer) correct++;
      });
  
      // Ensure the score is an integer
      const finalScore = Math.floor(correct);
      setScore(finalScore);
      setSubmitted(true);
  
      const timestampIST = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      });
  
      // Log what we're trying to insert for debugging
      const dataToInsert = {
        name,
        time_taken: secondsElapsed,
        timestamp: timestampIST,
        course: "sts302p",
        score: finalScore,
      };
      console.log("Attempting to insert:", dataToInsert);
  
      // Insert into quiz_results table
      const { data, error } = await supabase.from("quiz_sts").insert([
        dataToInsert
      ]).select();
  
      if (error) {
        console.error("Error inserting data:", error);
        alert(`Failed to save result: ${error.message}`);
      } else {
        console.log("Data inserted successfully:", data);
      }
    } catch (err) {
      console.error("Unexpected error occurred:", err);
      alert(`Unexpected error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };
  

  const resetQuiz = () => {
    setUserAnswers({});
    setShowAnswers(false);
    setScore(0);
    setSubmitted(false);
    setSecondsElapsed(0);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto p-4 max-w-4xl">
          <h1 className="text-3xl font-bold mb-6 text-center">All Topics Quiz</h1>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Timer: {secondsElapsed}s</h2>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setShowAnswers((prev) => !prev)}>
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

          {questions.map((question, index) => {
            const isCorrect = submitted && userAnswers[index] === question.answer;
            const isWrong =
              submitted &&
              userAnswers[index] &&
              userAnswers[index] !== question.answer;

            return (
              <Card key={index} className="mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                  <CardDescription className="text-base font-medium">
                    {question.question}
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {question.options.map((option, i) => {
                    const isSelected = userAnswers[index] === option;
                    return (
                      <Card
                        key={i}
                        className={`cursor-pointer p-4 transition border ${
                          isCorrect && option === question.answer
                            ? "border-green-600 bg-green-50 text-green-800"
                            : isWrong && isSelected
                            ? "border-red-600 bg-red-50 text-red-800"
                            : isSelected
                            ? "border-blue-600 bg-blue-50 text-blue-800"
                            : ""
                        }`}
                        onClick={() => handleAnswerChange(index, option)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {submitted && option === question.answer && (
                            <CheckCircle2 className="text-green-600 w-5 h-5" />
                          )}
                          {submitted &&
                            option === userAnswers[index] &&
                            option !== question.answer && (
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
            );
          })}

          {!submitted ? (
            <Button onClick={handleSubmit} className="w-full">
              Submit Answers
            </Button>
          ) : (
            <Button onClick={resetQuiz} className="w-full" variant="outline">
              Reset Quiz
            </Button>
          )}
        </div>
      </main>

      <Footer />

      <Dialog open={showNamePrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your name to start</DialogTitle>
            <DialogDescription>This will be used for the leaderboard.</DialogDescription>
          </DialogHeader>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                if (name.trim() !== "") setShowNamePrompt(false);
              }}
            >
              Start Quiz
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuizApp;
