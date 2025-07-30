import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setQuestions,
  startQuiz,
  setLoading,
} from "../Slice/QuizSlice.js";
import he from "he";
import { nanoid } from "nanoid";

const EmailForm = () => {
  const [email, setLocalEmail] = useState("");
  const [error, setError] = useState("");
  const dispatchToRedux = useDispatch();

  const handleStart = async () => {
    const isValid = /^\S+@\S+\.\S+$/.test(email);
    if (!isValid) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      dispatchToRedux(setLoading(true));
      const res = await fetch(
        "https://opentdb.com/api.php?amount=15&type=multiple"
      );
      const data = await res.json();

      const formattedQuestions = data.results.map((q) => ({
        id: nanoid(),
        question: he.decode(q.question),
        correct_answer: he.decode(q.correct_answer),
        options: shuffle([
          ...q.incorrect_answers.map((a) => he.decode(a)),
          he.decode(q.correct_answer),
        ]),
        category: q.category,
        difficulty: q.difficulty,
        type: q.type,
        selectedAnswer: null,
        status: "unvisited",
      }));

        dispatchToRedux(setEmail(email));
        dispatchToRedux(setQuestions(formattedQuestions));
        dispatchToRedux(startQuiz());
        dispatchToRedux(setLoading(false));
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  return (
  <div className="flex justify-center items-center w-full min-h-[calc(100vh-64px)] px-4">
  <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-xl w-full max-w-lg sm:max-w-xl md:max-w-2xl relative animate-fade-in border border-gray-200">
        {/* Decorative background glow */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-tr from-blue-400 to-pink-400 opacity-20 rounded-full blur-2xl z-0"></div>
        <div className="relative z-10 text-center">
          <h2 className="text-2xl font-bold mb-3 text-gray-800">
            Start Your Quiz
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your email to begin
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setLocalEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-3"
          />
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}
          <button
            onClick={handleStart}
            className="w-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold py-2 rounded-md shadow-md hover:scale-105 transition-all cursor-pointer"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
