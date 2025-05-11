type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advance"; // Adjust if more levels are used
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

type Lesson = {
  id: string;
  title: string;
  content: string;
  order: number;
  videoUrl: string | null;
};

type QuizOption = {
  id: string;
  text: string;
};

type QuizQuestion = {
  id: string;
  question: string;
  order: number;
  options: QuizOption[];
  correctOption: QuizOption;
};

type Quiz = {
  id: string;
  title: string;
  order: number;
  questions: QuizQuestion[];
};

type Module = {
  id: string;
  title: string;
  description: string;
  order: number;
  xp: number;
};

type CourseResponse = {
  modules: Module[];
};

type UserProgress = {
  userId: string;
  courseId: string;
  enrolledAt: string; // ISO date string
  moduleProgress: number;
  testProgress: string; // PASSED, FAILED, UNATTEMPTED
};
