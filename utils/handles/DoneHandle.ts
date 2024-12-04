import { Dispatch, SetStateAction } from "react";
import { doneTodosFatch } from "../fatch/doneTodoFatch";

export function DoneHandle({
  todos,
  setTodos,
}: {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}) {
  return (id: number) => {
    const editTodos = todos.map((todo) => {
      if (todo.id === id) {
        doneTodosFatch({ id, isDone: !todo.isDone });
        return { ...todo, isDone: !todo.isDone };
      } else {
        return { ...todo };
      }
    });
    setTodos(editTodos);
  };
}
