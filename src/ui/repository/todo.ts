interface TodoRepositoryGetParams {
  page: number;
  limit: number;
}

interface TodoRepositoryGetOutput {
  todoList: Todo[];
}

interface Todo {
  id: string;
  date: Date;
  content: string;
  done: boolean;
}

function get({
  page,
  limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
  return fetch("http://localhost:3000/api/todos").then(async (res) => {
    const todosJSON = await res.json();
    const todos = todosJSON.todoList;

    return {
      todoList: todos,
    };
  });
}

export const todoRepository = {
  get,
};
