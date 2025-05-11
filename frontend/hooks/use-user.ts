export const useUser = () => {
  // get user details from localStorage and parse any JSON strings if needed
  const email =
    typeof window !== "undefined"
      ? parseStoredValue(localStorage.getItem("email"))
      : null;
  const username =
    typeof window !== "undefined"
      ? parseStoredValue(localStorage.getItem("username"))
      : null;
  const token =
    typeof window !== "undefined"
      ? parseStoredValue(localStorage.getItem("auth_token"))
      : null;

  const isAuthenticated = !!token;
  const isLoading = false; // Assuming loading is handled elsewhere

  const user = {
    email,
    username,
    token,
  };

  return {
    user,
    isAuthenticated,
    isLoading,
  };
};

// Helper function to parse stored values that might be JSON strings
function parseStoredValue(value: string | null): string | null {
  if (!value) return null;

  try {
    // If the value is a JSON string (like "\"example@email.com\""), this will remove the quotes
    const parsed = JSON.parse(value);
    return typeof parsed === "string" ? parsed : value;
  } catch {
    // If it's not valid JSON, return the original value
    return value;
  }
}
