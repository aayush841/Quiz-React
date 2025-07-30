import { useSelector, useDispatch } from "react-redux";
import { goToQuestion } from "../Slice/QuizSlice";

const QuestionGrid = () => {
  const dispatch = useDispatch();
  const { questions, currentQuestion } = useSelector((state) => state.quiz);

  const getStatusColor = (question, index) => {
    if (index === currentQuestion) return "bg-blue-500 text-white";
    if (question.status === "attempted") return "bg-green-500 text-white";
    if (question.status === "visited") return "bg-yellow-400 text-white";
    return "bg-gray-200";
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md z-50">
      <div className="w-full flex justify-center">
        <div
          className="flex gap-2 overflow-x-auto overflow-y-hidden max-w-full px-4 py-2 scrollbar-hide"
        >
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => dispatch(goToQuestion(index))}
              title={`Question ${index + 1}`}
              className={`
                w-10 h-10 min-w-[2.5rem]
                rounded-sm text-sm font-semibold flex items-center justify-center
                transition-all duration-150 transform
                ${getStatusColor(q, index)}
                ${index === currentQuestion ? "scale-110 shadow-md" : "hover:scale-110"}
                cursor-pointer
              `}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionGrid;
