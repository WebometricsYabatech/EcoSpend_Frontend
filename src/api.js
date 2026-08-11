const BASE_URL = import.meta.env.VITE_API_URL;

// ── AUTH ──
export async function loginUser(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Invalid credentials.");
  return data;
}

export async function signupUser(fullname, email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullname, email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Signup failed. Please try again.");
  return data;
}

export async function logoutUser() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/auth/logout`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Logout failed.");
  localStorage.removeItem("token");
  return data;
}

export async function deleteAccount() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/auth/account`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete account.");
  localStorage.removeItem("token");
  return data;
}

// ── EXPENSES ──
export async function getExpenses() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/expenses`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch expenses.");
  return data.expenses;
}

export async function getExpenseById(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch expense.");
  return data;
}

export async function createExpense(expenseData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create expense.");
  return data;
}

export async function updateExpense(id, expenseData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/expenses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(expenseData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update expense.");
  return data;
}

export async function deleteExpense(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/expenses/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete expense.");
  return data;
}

export async function exportData(format, dateRange) {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${BASE_URL}/api/expenses/report?format=${format}&range=${dateRange}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Failed to export data.");
  }
  return response.blob();
}

// ── AI ──
export async function scanReceipt(file) {
  const formData = new FormData();
  formData.append("receipt", file);

  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/ai/scan-receipt`, {
    method: "POST",
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: formData,
  });

  const data = await response.json();

  console.log("Status:", response.status);
  console.log("Response:", data);

  if (!response.ok) {
    throw new Error(data.error || data.message || "Failed to scan receipt");
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
  if (!response.ok) throw new Error(data.message || "Failed to confirm receipt.");
  return data;
}

// ── RECEIPTS ──
export async function deleteReceipt(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/receipts/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete receipt.");
  return data;
}

export async function deleteAllReceipts() {
  const expenses = await getExpenses();
  await Promise.all(expenses.map((expense) => deleteReceipt(expense.id)));
}

// ── BUDGET ──
export async function getBudget() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/budget`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch budget.");
  return data;
}

export async function updateBudget(budgetData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/budget`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budgetData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update budget.");
  return data;
}

// ── DASHBOARD ──
export async function getDashboard() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch dashboard.");
  return data;
}

// ── CATEGORIES ──
export async function getCategories() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/categories`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch categories.");
  return data;
}

export async function createCategory(categoryData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/categories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(categoryData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create category.");
  return data;
}

export async function deleteCategory(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/categories/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to delete category.");
  return data;
}

// ── PROFILE ──
export async function getProfile() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch profile.");
  return data;
}

export async function updateProfile(profileData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update profile.");
  return data;
}

export async function changePassword(newPassword) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/profile/change-password`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ newPassword }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to change password.");
  return data;
}

// ── USER ──
export async function getUserProfile() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch user profile.");
  return data;
}

export async function updateUserProfile(profileData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/user/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update user profile.");
  return data;
}

export async function uploadAvatar(file) {
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await fetch(`${BASE_URL}/api/user/avatar`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to upload avatar.");
  return data;
}

// ── TRANSACTIONS ──
export async function getTransactions() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/transactions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch transactions.");
  return data;
}

export async function getTransactionById(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/transactions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch transaction.");
  return data;
}

export async function updateTransaction(id, transactionData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}/api/transactions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transactionData),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to update transaction.");
  return data;
}
export async function getReceiptHistory() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/receipts/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch receipt history.");
  }

  return data;
}
export const createCategory = async (category) => {
  const response = await API.post("/api/categories", {
    category,
  });

  return response.data;
};

// Update an existing category
export const updateCategory = async (id, category) => {
  const response = await API.put(`/api/categories/${id}`, {
    category,
  });

  return response.data;
};
export const updateCurrency = async (currency) => {
  const response = await API.put("/api/profile/currency", {
    currency,
  });

  return response.data;
};