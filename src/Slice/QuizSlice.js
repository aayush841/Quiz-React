import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  questions: [],
  currentQuestion: 0,
  score: 0,
  timeLeft: 30 * 60, 
  quizStarted: false,
  quizFinished: false,
  loading: false,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    goToQuestion: (state, action) => {
      const index = action.payload;
       const current = state.currentQuestion;

    // 🟡 Mark current question as "visited" if it’s still unvisited and not attempted
    if (state.questions[current].status === "unvisited") {
        state.questions[current].status = "visited";
    }
      state.currentQuestion = index;
      if (state.questions[index].status === "unvisited") {
        state.questions[index].status = "visited";
      }
    },

    startQuiz: (state) => {
      state.quizStarted = true;
      state.currentQuestion = 0;
      state.quizFinished = false;
      state.timeLeft = 30 * 60; // ⏱ reset to 30 mins
    },

    answerQuestion: (state, action) => {
      const { questionId, selectedAnswer } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (question) {
        question.selectedAnswer = selectedAnswer;
        question.status = "attempted";
        if (selectedAnswer === question.correct_answer) {
          state.score += 1;
        }
      }
    },

   nextQuestion: (state) => {
    const current = state.currentQuestion;

    // 🟡 Mark current question as "visited" if it’s still unvisited and not attempted
    if (state.questions[current].status === "unvisited") {
        state.questions[current].status = "visited";
    }

    // 🔄 Move to next
    if (current + 1 < state.questions.length) {
        state.currentQuestion += 1;
    } else {
        state.quizFinished = true;
    }
    },


    finishQuiz: (state) => {
      state.quizFinished = true;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.quizFinished = true; // auto-submit when time ends
      }
    },
    resetTime: (state) => {
      state.timeLeft = 30 * 60;
    },
    setLoading: (state, action) => {
    state.loading = action.payload;
  },

  resetQuiz: () => {
  localStorage.removeItem("quizState"); 
  return initialState;
}
  },
});

export const {
  setEmail,
  setQuestions,
  goToQuestion,
  startQuiz,
  answerQuestion,
  nextQuestion,
  finishQuiz,
  resetQuiz,
  decrementTime,
  setLoading,
} = quizSlice.actions;

export default quizSlice.reducer;
