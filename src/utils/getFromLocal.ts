const getFromLocal = (key:string) => {
  return JSON.parse(localStorage.getItem(key) || `{}`);
};
export default getFromLocal;
