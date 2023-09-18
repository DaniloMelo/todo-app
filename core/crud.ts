import fs from "fs";
import { v4 as uuid } from "uuid";

const DB_FILE_PATH = "./core/dataBase";

interface Todo {
  id: string;
  date: string;
  content: string;
  done: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    date: new Date().toISOString(),
    content: content,
    done: false,
  };

  const todoList: Todo[] = [...read(), todo];

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList,
        algumaOutraCoisa: [],
      },
      null,
      2
    )
  );

  return todo;
}

export function read(): Todo[] {
  const dataString = fs.readFileSync(DB_FILE_PATH, "utf-8");
  const dataObj = JSON.parse(dataString || "{}");

  if (!dataObj.todoList) {
    return [];
  }

  return dataObj.todoList;
}

function update(id: string, partialTodo: Partial<Todo>): Todo {
  let updatedTodo;

  const todoList = read();

  todoList.forEach((todo) => {
    const isToUpdate = todo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(todo, partialTodo);
    }
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList,
      },
      null,
      2
    )
  );

  if (!updatedTodo) {
    throw new Error("Provide a valid ID!");
  }

  return updatedTodo;
}

function updateContent(id: string, content: string): Todo {
  return update(id, {
    content,
  });
}

function updateStatus(id: string, done: boolean): Todo {
  return update(id, {
    done,
  });
}

function deleteByID(id: string) {
  const todoList = read().filter((todo) => {
    if (todo.id === id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(
    DB_FILE_PATH,
    JSON.stringify(
      {
        todoList,
      },
      null,
      2
    )
  );
}

function CLEAR_DB() {
  fs.writeFileSync(DB_FILE_PATH, "");
}

// CLEAR_DB();

// const primeiraTodo = create("Primeira TODO");
// const segundaTodo = create("Segunda TODO");
// const terceiraTodo = create("Terceira TODO");
// const quartaTodo = create("Quarta TODO");

// updateContent(primeiraTodo.id, "Primeira TODO atualizada");
// updateStatus(primeiraTodo.id, true);

// deleteByID(segundaTodo.id);

// console.log(read());
