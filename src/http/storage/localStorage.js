const getToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (token !== null) return JSON.parse(token);
  } catch (error) {
    return null;
  }
};
const setStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
const clearStorage = (key) => {
  localStorage.removeItem(key);
};

export { getToken, setStorage, getStorage, clearStorage };
