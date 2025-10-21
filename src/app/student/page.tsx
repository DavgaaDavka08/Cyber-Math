"use client";

import type React from "react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "../components/auth-guard";
import { Header } from "../components/header";
import { CyberBg } from "../components/cyber-bg";
import Image from "next/image";

interface Problem {
  id: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
}

interface Submission {
  problemId: string;
  answer: string;
  isCorrect: boolean;
  timestamp: string;
}

export default function StudentPage() {
  const { user, loading, logout } = useAuth("student");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mathProblems");
    if (stored) {
      setProblems(JSON.parse(stored));
    }

    const storedSubmissions = localStorage.getItem("submissions");
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  const currentProblem = problems[currentProblemIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentProblem || !answer.trim()) return;

    const isCorrect =
      answer.trim().toLowerCase() ===
      currentProblem.correctAnswer.toLowerCase();

    const newSubmission: Submission = {
      problemId: currentProblem.id,
      answer: answer.trim(),
      isCorrect,
      timestamp: new Date().toISOString(),
    };

    const updatedSubmissions = [...submissions, newSubmission];
    setSubmissions(updatedSubmissions);
    localStorage.setItem("submissions", JSON.stringify(updatedSubmissions));

    setSubmission(newSubmission);
  };

  const handleNext = () => {
    setAnswer("");
    setSubmission(null);
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1);
    } else {
      setCurrentProblemIndex(0);
    }
  };

  const stats = {
    total: submissions.length,
    correct: submissions.filter((s) => s.isCorrect).length,
    incorrect: submissions.filter((s) => !s.isCorrect).length,
  };

  const difficultyLabels = {
    easy: "Хялбар",
    medium: "Дунд",
    hard: "Хүнд",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role={user.role} onLogout={logout} />
      <CyberBg />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Бодлого бод</h1>
          <p className="text-muted-foreground mt-1">
            Математикийн чадвараа шалгаарай
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-indigo-600">
                  {stats.total}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Нийт оролдлого
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600">
                  {stats.correct}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Зөв</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-red-600">
                  {stats.incorrect}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Буруу</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {problems.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Одоогоор бодлого байхгүй байна. Дараа дахин орж үзээрэй!
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      currentProblem.difficulty === "easy"
                        ? "secondary"
                        : currentProblem.difficulty === "medium"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {difficultyLabels[currentProblem.difficulty]}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Бодлого {currentProblemIndex + 1} / {problems.length}
                  </span>
                </div>
              </div>
              <CardTitle className="text-2xl mt-4">
                {currentProblem.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!submission ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Хариултаа оруулна уу..."
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className="text-lg"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!answer.trim()}
                  >
                    Хариулт илгээх
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  {submission.isCorrect ? (
                    <Alert className="border-green-200 bg-green-50">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-600 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-semibold text-green-900">Зөв!</h4>
                          <AlertDescription className="text-green-800 mt-1">
                            Маш сайн! Таны хариулт зөв байна.
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  ) : (
                    <Alert className="border-red-200 bg-red-50">
                      <div className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-red-600 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <div className="flex-1">
                          <h4 className="font-semibold text-red-900">Буруу</h4>
                          <AlertDescription className="text-red-800 mt-1">
                            Таны хариулт:{" "}
                            <span className="font-semibold">
                              {submission.answer}
                            </span>
                          </AlertDescription>
                          <AlertDescription className="text-red-800 mt-1">
                            Зөв хариулт:{" "}
                            <span className="font-semibold">
                              {currentProblem.correctAnswer}
                            </span>
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  )}

                  {!submission.isCorrect && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardHeader>
                        <CardTitle className="text-base text-blue-900">
                          Тайлбар
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-blue-800">
                          {currentProblem.explanation}
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <Button onClick={handleNext} className="w-full">
                    Дараагийн бодлого
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
