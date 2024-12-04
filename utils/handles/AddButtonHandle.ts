import { ITask } from "@/app/content/todos/page";
import { Dispatch, SetStateAction } from "react";
import { createTodoFatch } from "../fatch/createTodoFatch";

export function AddButtonHandle({
  newTodoInput,
  task,
  subTitle,
  setTodos,
  todos,
  tasks,
  setShowModal,
  setNewTodoInput,
  setSubTitle,
}: {
  newTodoInput: string;
  task: ITask | undefined;
  subTitle: string;
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
  todos: TodoType[];
  tasks: ITask[];
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setNewTodoInput: Dispatch<SetStateAction<string>>;
  setSubTitle: Dispatch<SetStateAction<string>>;
}) {
  return async () => {
    if (newTodoInput.replace(/\s/g, "") !== "" && task) {
      const newTodo = await createTodoFatch({
        taskId: task.id,
        title: newTodoInput,
        subTitle,
      });

      if (newTodo) {
        setTodos([
          ...todos,
          {
            id: newTodo.id,
            title: newTodoInput,
            isDone: false,
            subTitle,
            taskId: tasks.filter((task) => task.id === newTodo.taskId)?.[0]?.id,
          },
        ]);
        setShowModal(false);
      }
      setNewTodoInput("");
      setSubTitle("");
    }
  };
}
