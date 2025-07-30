import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementTime, finishQuiz } from "../Slice/QuizSlice";

const Timer = () => {
  const dispatchToRedux = useDispatch();
  const { timeLeft, quizStarted, quizFinished } = useSelector((state) => state.quiz);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!quizStarted || quizFinished) return;

    const interval = setInterval(() => {
      dispatchToRedux(decrementTime());

      if (timeLeft <= 1) {
        dispatchToRedux(finishQuiz());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [quizStarted, quizFinished, timeLeft, dispatchToRedux]);

  if (!quizStarted || quizFinished) return null;

  return (
    <div className="fixed top-[90px] left-1/2 transform -translate-x-1/2 z-50 w-full px-4 sm:px-0 flex justify-center">
 <div className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-3 py-1 sm:px-6 sm:py-2 rounded-full shadow-lg text-sm sm:text-lg font-semibold tracking-wider animate-pulse w-max">

    ⏱ Time Left: <span className="font-mono">{formatTime(timeLeft)}</span>
  </div>
</div>


  );
};

export default Timer;
