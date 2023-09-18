async function get() {
  return fetch("http://localhost:3000/api/todos").then(async (res) => {
    const todos = await res.json();
    return todos;
  });
}

export const todoController = {
  get,
};
