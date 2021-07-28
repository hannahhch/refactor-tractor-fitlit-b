export const getUserData = (type) => {
  return fetch(`http://localhost:3001/api/v1/${type}`)
  .then(response => response.json())
  .then(data => data)
};
