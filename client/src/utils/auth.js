export function getToken() {
  return localStorage.getItem("authToken");
}

export function getUser() {
  let userStr = localStorage.getItem("authUser");

  if (userStr) {
    return JSON.parse(userStr);
  } else {
    return null;
  }
}

export function useAuthToken() {
  return getToken();
}

export function isAuthenticated() {
  return !!getToken();
}

export function useAuthUser() {
  return getUser();
}

export function logout() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
}

export function login(token, user) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
}
