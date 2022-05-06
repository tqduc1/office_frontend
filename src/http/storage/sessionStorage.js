const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};
const getSessionStorage = (key) => {
  return JSON.parse(sessionStorage.getItem(key));
};
const clearSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};

export { setSessionStorage, getSessionStorage, clearSessionStorage };
