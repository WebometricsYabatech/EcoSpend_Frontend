const BASE_URL ="https://eco-spend-backend.vercel.app";

export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Invalid credentials.");
  }

  return data;
}

export async function signupUser(fullname, email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { 
        "Content-Type": "application/json"},
    body: JSON.stringify({ fullname, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed. Please try again.");
  }

  return data;
}
