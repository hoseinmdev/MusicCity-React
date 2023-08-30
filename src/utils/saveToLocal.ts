const saveToLocal = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};
export default saveToLocal;
