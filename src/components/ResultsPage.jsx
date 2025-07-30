import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../Slice/QuizSlice";

const ResultsPage = () => {
  const dispatchToRedux = useDispatch();
  const { questions, score } = useSelector((state) => state.quiz);

  const handleRestart = () => {
    dispatchToRedux(resetQuiz());
  };

  return (
    <div className="w-full min-h-screen px-4 py-10 flex justify-center items-start bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">🎉 Quiz Results</h1>
        <p className="text-center text-lg font-semibold mb-8">
          Your Score: <span className="text-blue-600">{score}</span> /{" "}
          {questions.length}
        </p>

        <div className="space-y-8">
          {questions.map((q, index) => {
            const isCorrect = q.selectedAnswer === q.correct_answer;
            const isUnanswered = !q.selectedAnswer;

            return (
              <div key={index} className="border-b pb-6 last:border-none">
                <h2 className="font-semibold text-gray-800 mb-2">
                  {index + 1}. {q.question}
                </h2>

                <div className="space-y-2">
                  {q.options.map((opt, i) => {
                    const baseStyle =
                      "block w-full text-left px-4 py-2 rounded-md transition";

                    let style = "bg-gray-100";
                    if (opt === q.correct_answer) {
                      style = "bg-green-500 text-white"; // Always show correct
                    }
                    if (
                      opt === q.selectedAnswer &&
                      opt !== q.correct_answer
                    ) {
                      style = "bg-red-500 text-white"; // Wrong selected
                    }

                    return (
                      <div key={i} className={`${baseStyle} ${style}`}>
                        {opt}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <p>
                    ✅ Correct Answer:{" "}
                    <span className="font-semibold">{q.correct_answer}</span>
                  </p>
                  <p>
                    📝 Your Answer:{" "}
                    <span className={`font-semibold ${isCorrect ? "text-green-600" : isUnanswered ? "text-blue-600" : "text-red-600"}`}>
                      {q.selectedAnswer || "Not Attempted"}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🔁 Restart Button */}
        <div className="mt-10 text-center">
          <button
            onClick={handleRestart}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-150 shadow-md cursor-pointer"
          >
             Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
