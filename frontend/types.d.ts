type Course = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advance"; // Adjust if more levels are used
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};
