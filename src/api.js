const BASE_URL = import.meta.env.VITE_API_URL;

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
  console.log("BASE_URL:", BASE_URL);
  console.log("Fetching:", `${BASE_URL}/api/auth/register`);
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
export async function scanReceipt(file) {
  const formData = new FormData();
  formData.append("receipt", file);

  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/ai/scan-receipt`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      // Don't set Content-Type — browser sets it automatically with boundary for FormData
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to scan receipt. Please try again.");
  }

  return data;
}

export async function confirmReceipt(receiptData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/ai/confirm-receipt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(receiptData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to confirm receipt. Please try again.");
  }

  return data;
}