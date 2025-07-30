import { useDispatch, useSelector } from "react-redux";
import {
  answerQuestion,
  nextQuestion,
  goToQuestion,
  finishQuiz,
} from "../Slice/QuizSlice";

const QuestionCard = () => {
  const dispatchToRedux = useDispatch();
  const { questions, currentQuestion } = useSelector((state) => state.quiz);

  const q = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const allAttempted = questions.every((q) => q.selectedAnswer); // or q.status === "attempted"

  const handleOptionClick = (option) => {
    if (q.selectedAnswer) return;
    dispatchToRedux(answerQuestion({ questionId: q.id, selectedAnswer: option }));
  };

  const getOptionStyle = (option) => {
    if (option === q.selectedAnswer) return "bg-blue-500 text-white";
    return "bg-gray-100 hover:bg-gray-200";
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      dispatchToRedux(goToQuestion(currentQuestion + 1));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      dispatchToRedux(goToQuestion(currentQuestion - 1));
    }
  };

  return (
   <div className="w-full min-h-[calc(100vh-120px)] flex justify-center items-center px-4 pt-20 pb-32 sm:pb-24">
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-2xl animate-fade-in">
        <div className="mb-2 text-sm text-gray-500 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </div>

        <h2 className="text-lg font-semibold mb-6">{q.question}</h2>

        <div className="space-y-3 mb-6">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleOptionClick(opt)}
              disabled={!!q.selectedAnswer}
              className={`w-full text-left px-4 py-2 rounded-md transition ${getOptionStyle(opt)} ${
                !q.selectedAnswer && "cursor-pointer"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
       <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-stretch sm:items-center">
  {/* Previous Button */}
  <button
    onClick={handlePrevious}
    disabled={currentQuestion === 0}
    className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-all duration-150 transform ${
      currentQuestion === 0
        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
        : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md cursor-pointer"
    }`}
  >
    Previous
  </button>


  {/* Next / Final Finish Button */}
  {isLastQuestion && allAttempted ? (
    <button
      onClick={() => dispatchToRedux(finishQuiz())}
      className="w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-all duration-150 transform bg-green-600 text-white hover:bg-green-700 active:scale-95 shadow-md cursor-pointer"
    >
      Finish Quiz
    </button>
  ) : (
    <button
      onClick={handleNext}
      disabled={isLastQuestion}
      className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium transition-all duration-150 transform ${
        isLastQuestion
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-blue-500 text-white hover:bg-blue-600 active:scale-95 shadow-md cursor-pointer"
      }`}
    >
      Next
    </button>
  )}
  
  {/* Conditional Finish Button  */}
  {allAttempted && !isLastQuestion && (
    <button
      onClick={() => dispatchToRedux(finishQuiz())}
      className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 active:scale-95 transition shadow-md cursor-pointer"
    >
      Finish Quiz
    </button>
  )}
</div>

      </div>
    </div>
  );
};

export default QuestionCard;
