import { useSelector } from "react-redux";
import EmailForm from "./EmailForm";
import QuestionCard from "./QuestionCard";
import QuestionGrid from "./QuestionGrid";
import ResultsPage from "./ResultsPage";
import Timer from "./Timer";
import { useEffect } from "react";

const Quiz = () => {
  const { quizStarted, quizFinished, loading} = useSelector((state) => state.quiz);
    useEffect(() => {
  if (quizFinished) {
    window.onbeforeunload = null;
  } else {
    window.onbeforeunload = () => true;
  }
}, [quizFinished]);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-700">Starting your quiz...</p>
        </div>
      </div>
    );
  }


  return (
    <>
      {!quizStarted && <EmailForm />}

      {quizStarted && !quizFinished && (
        <>
          <Timer />
          <QuestionCard />
          <QuestionGrid />
        </>
      )}

      {quizFinished && <ResultsPage />}
    </>
  );
};

export default Quiz;
