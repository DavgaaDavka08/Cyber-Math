"use client";

import type React from "react";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "../components/auth-guard";
import { Header } from "../components/header";

interface Problem {
  id: string;
  question: string;
  correctAnswer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  createdAt: string;
}

export default function AdminPage() {
  const { user, loading, logout } = useAuth("admin");
  const [problems, setProblems] = useState<Problem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    correctAnswer: "",
    explanation: "",
    difficulty: "medium" as "easy" | "medium" | "hard",
  });

  useEffect(() => {
    const stored = localStorage.getItem("mathProblems");
    if (stored) {
      setProblems(JSON.parse(stored));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProblem: Problem = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
    };

    const updatedProblems = [...problems, newProblem];
    setProblems(updatedProblems);
    localStorage.setItem("mathProblems", JSON.stringify(updatedProblems));

    setFormData({
      question: "",
      correctAnswer: "",
      explanation: "",
      difficulty: "medium",
    });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    const updatedProblems = problems.filter((p) => p.id !== id);
    setProblems(updatedProblems);
    localStorage.setItem("mathProblems", JSON.stringify(updatedProblems));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) return null;

  const difficultyLabels = {
    easy: "Хялбар",
    medium: "Дунд",
    hard: "Хүнд",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} role={user.role} onLogout={logout} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Бодлого удирдах
            </h1>
            <p className="text-muted-foreground mt-1">
              Математикийн бодлого үүсгэх, удирдах
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Цуцлах" : "+ Бодлого нэмэх"}
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Шинэ бодлого үүсгэх</CardTitle>
              <CardDescription>Бодлогын мэдээллийг оруулна уу</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question">Бодлогын асуулт</Label>
                  <Textarea
                    id="question"
                    placeholder="Жишээ нь: 15 + 27 нь хэд вэ?"
                    value={formData.question}
                    onChange={(e) =>
                      setFormData({ ...formData, question: e.target.value })
                    }
                    required
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Зөв хариулт</Label>
                  <Input
                    id="answer"
                    placeholder="Жишээ нь: 42"
                    value={formData.correctAnswer}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        correctAnswer: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="explanation">
                    Тайлбар (буруу хариулт өгөхөд харагдана)
                  </Label>
                  <Textarea
                    id="explanation"
                    placeholder="Энэ бодлогыг хэрхэн бодохыг тайлбарлана уу..."
                    value={formData.explanation}
                    onChange={(e) =>
                      setFormData({ ...formData, explanation: e.target.value })
                    }
                    required
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Хүндийн түвшин</Label>
                  <div className="flex gap-2">
                    {(["easy", "medium", "hard"] as const).map((level) => (
                      <Button
                        key={level}
                        type="button"
                        variant={
                          formData.difficulty === level ? "default" : "outline"
                        }
                        onClick={() =>
                          setFormData({ ...formData, difficulty: level })
                        }
                        className="capitalize"
                      >
                        {difficultyLabels[level]}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Бодлого үүсгэх
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {problems.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">
                  Одоогоор бодлого үүсгээгүй байна. Эхний бодлогоо нэмээрэй!
                </p>
              </CardContent>
            </Card>
          ) : (
            problems.map((problem) => (
              <Card key={problem.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant={
                            problem.difficulty === "easy"
                              ? "secondary"
                              : problem.difficulty === "medium"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {difficultyLabels[problem.difficulty]}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {problem.question}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(problem.id)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Зөв хариулт:
                    </p>
                    <p className="font-semibold text-green-600">
                      {problem.correctAnswer}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Тайлбар:
                    </p>
                    <p className="text-sm text-gray-700">
                      {problem.explanation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
