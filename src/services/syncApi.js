const BASE_URL = "http://192.168.229.136:3000";
const USER_ID = "demo-user-1";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`API ${path} failed: ${response.status} ${text}`);
  }
  return response.json();
}

export const syncApi = {
  baseUrl: BASE_URL,
  userId: USER_ID,

  getSyncState: () => request("/api/sync/state"),
  updateProfile: (profile, userName) =>
    request("/api/profile", {
      method: "PUT",
      body: JSON.stringify({ userId: USER_ID, profile, userName }),
    }),

  getContacts: () => request("/api/contacts"),
  addContact: (payload) =>
    request("/api/contacts", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateContact: (contactId, payload) =>
    request(`/api/contacts/${contactId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  deleteContact: (contactId) =>
    request(`/api/contacts/${contactId}`, {
      method: "DELETE",
    }),

  triggerEmergency: (payload) =>
    request("/api/emergency/trigger", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  resolveEmergency: () =>
    request("/api/emergency/resolve", {
      method: "POST",
      body: JSON.stringify({ userId: USER_ID }),
    }),
  getHistory: () => request("/api/history"),

  sendSOS: (payload) =>
    request("/api/sos", {
      method: "POST",
      body: JSON.stringify({ source: "phone", userId: USER_ID, ...payload }),
    }),
  getLatestSOS: () => request("/api/sos/latest"),
  markSafe: () =>
    request("/api/safe", {
      method: "POST",
      body: JSON.stringify({ userId: USER_ID, source: "phone" }),
    }),
};
