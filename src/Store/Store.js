import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "../Slice/QuizSlice.js";

// ✅ Load persisted state
const loadState = () => {
  try {
    const serialized = localStorage.getItem("quizState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch (e) {
    return undefined;
  }
};

// ✅ Save state to localStorage
const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("quizState", serialized);
  } catch (e) {
    console.error("Failed to save state:", e);
  }
};

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
  preloadedState: {
    quiz: loadState(), // 👈 Load initial quiz state
  },
});

// ✅ Subscribe to changes
store.subscribe(() => {
  saveState(store.getState().quiz); // 👈 Save only the quiz slice
});

export default store;
