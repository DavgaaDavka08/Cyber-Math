"use client";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "../components/header";
import { NumericKeypad } from "../components/numeric-keypad";
import { useAuth } from "../components/auth-guard";

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
  const [currentProblemIndex, setCurrentProblemIndex] = useState<number | null>(
    null
  );
  const [answer, setAnswer] = useState("");
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [showKeypad, setShowKeypad] = useState(false);

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

  const currentProblem =
    currentProblemIndex !== null ? problems[currentProblemIndex] : null;

  const handleSubmit = () => {
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
    setShowKeypad(false);
  };

  const handleNext = () => {
    setAnswer("");
    setSubmission(null);
    setCurrentProblemIndex(null);
  };

  const handleProblemSelect = (index: number) => {
    setCurrentProblemIndex(index);
    setAnswer("");
    setSubmission(null);
    setShowKeypad(false);
  };

  const handleKeypadInput = (value: string) => {
    setAnswer((prev) => prev + value);
  };

  const handleKeypadDelete = () => {
    setAnswer((prev) => prev.slice(0, -1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  if (!user) return null;

  if (currentProblemIndex === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50">
        <Header userName={user.name} role={user.role} onLogout={logout} />

        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="mb-8">
            <div className="playful-header mb-6">Сүүлчээр бодсон</div>
          </div>

          {problems.length === 0 ? (
            <Card className="border-4 border-purple-200 shadow-lg">
              <CardContent className="py-12 text-center">
                <p className="text-purple-600 font-semibold text-lg">
                  Одоогоор бодлого байхгүй байна. Дараа дахин орж үзээрэй!
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {problems.slice(0, 9).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleProblemSelect(index)}
                    className="aspect-square rounded-3xl bg-white border-4 border-gray-900 hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center shadow-lg text-4xl font-black"
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              {problems.length > 9 && (
                <button
                  onClick={() => handleProblemSelect(9)}
                  className="w-full aspect-[3/1] rounded-3xl bg-white border-4 border-gray-900 hover:bg-purple-50 active:scale-95 transition-all flex items-center justify-center shadow-lg text-4xl font-black"
                >
                  10
                </button>
              )}

              <Button
                onClick={() => handleProblemSelect(0)}
                className="w-full mt-6 h-16 rounded-3xl bg-green-500 hover:bg-green-600 text-white text-xl font-bold border-4 border-green-700 shadow-lg"
              >
                Эхлэх
              </Button>
            </>
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50">
      <Header userName={user.name} role={user.role} onLogout={logout} />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-6">
          <div className="playful-header">Дасгал бодлого</div>
        </div>

        <Card className="border-4 border-purple-300 shadow-xl rounded-3xl overflow-hidden bg-white mb-6">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <p className="text-2xl font-bold text-gray-900 leading-relaxed">
                {currentProblem?.question}
              </p>
            </div>

            {!submission ? (
              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Бодлогын хариуг бичих..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onFocus={() => setShowKeypad(true)}
                    className="w-full px-6 py-4 text-lg rounded-2xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200"
                  />
                  {answer && (
                    <button
                      onClick={handleSubmit}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-green-500 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center shadow-md"
                    >
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {showKeypad && (
                  <div className="pt-4">
                    <NumericKeypad
                      onInput={handleKeypadInput}
                      onDelete={handleKeypadDelete}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {submission.isCorrect ? (
                  <div className="bg-green-100 border-4 border-green-400 rounded-2xl p-6 text-center">
                    <div className="text-6xl mb-3">✓</div>
                    <h4 className="font-bold text-2xl text-green-900 mb-2">
                      Зөв!
                    </h4>
                    <p className="text-green-800 text-lg">
                      Маш сайн! Таны хариулт зөв байна.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="bg-red-100 border-4 border-red-400 rounded-2xl p-6 text-center">
                      <div className="text-6xl mb-3">✗</div>
                      <h4 className="font-bold text-2xl text-red-900 mb-2">
                        Буруу
                      </h4>
                      <p className="text-red-800 text-lg mb-2">
                        Таны хариулт:{" "}
                        <span className="font-bold">{submission.answer}</span>
                      </p>
                      <p className="text-red-800 text-lg">
                        Зөв хариулт:{" "}
                        <span className="font-bold">
                          {currentProblem?.correctAnswer}
                        </span>
                      </p>
                    </div>

                    <div className="bg-blue-100 border-4 border-blue-400 rounded-2xl p-6">
                      <h4 className="font-bold text-xl text-blue-900 mb-3">
                        Тайлбар
                      </h4>
                      <p className="text-blue-800 text-lg leading-relaxed">
                        {currentProblem?.explanation}
                      </p>
                    </div>
                  </>
                )}

                <Button
                  onClick={handleNext}
                  className="w-full h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold shadow-lg"
                >
                  Буцах
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
