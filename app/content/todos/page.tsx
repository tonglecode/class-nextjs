"use client";
import Layout from "@/components/layout";
import Modal from "@/components/modals/modal";
import CheckGreen from "@/components/svg/checkGreen";
import TodosLogo from "@/components/svg/todosLogo";
import AddTodoModal from "@/components/todos/addTodoModal";
import todoColors from "@/components/todos/todoColors";
import todoIcons from "@/components/todos/todoIcons";
import { createTodoFatch } from "@/utils/fatch/createTodoFatch";
import { doneTodosFatch } from "@/utils/fatch/doneTodoFatch";
import { removeTodosFatch } from "@/utils/fatch/removeTodoFatch";
import { todosFatch } from "@/utils/fatch/todosFatch";
import { useEffect, useState } from "react";
import { BiExpandVertical } from "react-icons/bi";

export interface ITask {
  id: number;
  title: string;
  color: string;
  icon: keyof typeof todoIcons | undefined;
}

const Todos = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");

  const [currentTask, setCurrentTask] = useState<number | undefined>();

  const [tasks, setTasks] = useState<ITask[]>([]);

  const [todos, setTodos] = useState<TodoType[]>([]);

  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const addTodoHandle = (taskId: number) => {
    if (showModal) {
      setCurrentTask(undefined);
      setShowModal(false);
    } else {
      setCurrentTask(taskId);
      setShowModal(true);
    }
  };
  const addButtonHandle = async () => {
    if (newTodoInput.replace(/\s/g, "") !== "" && currentTask) {
      const newTodo = await createTodoFatch({
        taskId: currentTask,
        title: newTodoInput,
        subTitle,
      });

      if (newTodo) {
        setTodos([
          ...todos,
          { id: newTodo.id, title: newTodoInput, isDone: false, subTitle },
        ]);
        setShowModal(false);
      }
      setNewTodoInput("");
      setSubTitle("");
    }
  };
  const deleteHandle = (id: number) => {
    console.log(id);
    const filtered = todos.filter((todo) => todo.id !== id);
    setTodos(filtered);
    removeTodosFatch({ id });
  };

  const doneHandle = (id: number) => {
    const editTodos = todos.map(
      (todo) => {
        if (todo.id === id) {
          doneTodosFatch({ id, isDone: !todo.isDone });
          return { ...todo, isDone: !todo.isDone };
        } else {
          return { ...todo };
        }
      }
      //   todo.id === id ? { ...todo, isDone: !todo.isDone } : { ...todo }
    );
    setTodos(editTodos);
  };

  const toggleExpand = (id: number) => {
    setExpandedTodo(expandedTodo === id ? null : id);
  };

  // 처음 todo 데이터 가져오기
  useEffect(() => {
    todosFatch({ setTodos, setTask: setTasks });
  }, []);

  useEffect(() => {
    console.log("todos", todos);
    console.log("task", tasks);
  }, [todos, tasks]);

  return (
    <Layout mobileFootLess={true}>
      <div className="w-full flex flex-col items-center ">
        {/* modal */}
        {showModal &&
          AddTodoModal({
            setShowModal,
            setNewTodoInput,
            setSubTitle,
            addButtonHandle,
          })}

        <div className="w-full px-12">
          <div className="max-w-[56rem] flex flex-col items-center mx-auto">
            {/* mobile */}
            <div className="w-full lg:hidden text-left m-8">
              <TodosLogo size={200} />
            </div>
            {/* Desktop */}
            <div className="hidden lg:flex w-full justify-between font-extrabold mt-32 mb-12">
              <TodosLogo />
              {/* <div
                onClick={() => setShowModal(!showModal)}
                className="inline text-center px-12 py-2 bg-blue-500 text-white text-[1.5rem] font-normal rounded-md"
              >
                Add new task
              </div> */}
            </div>

            <div className="grid grid-cols-4 w-full text-white">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    addTodoHandle(task.id);
                  }}
                >
                  <div
                    className={`relative hover:ring-4 bg-gray-900 rounded-lg w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem]`}
                  >
                    {task.title}
                    <div className="absolute top-1/2 -translate-y-1/2 left-5">
                      <div
                        className="w-8 h-8 rounded-full flex justify-center items-center"
                        style={{ backgroundColor: task.color }}
                      >
                        {task.icon && todoIcons[task.icon]}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="h-[70vh] w-full flex flex-col items-center">
              <div className="h-full w-full flex items-center">
                <div className="w-full text-[2rem] flex flex-col gap-4">
                  {todos?.map((item, index) => {
                    return (
                      <div key={index} className="relative">
                        <div
                          onClick={() => doneHandle(item.id)}
                          className={`relative bg-gray-900 ${
                            expandedTodo === item.id
                              ? "rounded-t"
                              : "rounded-lg"
                          }  w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem] ${
                            item.isDone && "line-through text-opacity-30"
                          }`}
                        >
                          {item.title}
                          <div className="absolute top-1/2 -translate-y-1/2 left-5">
                            {item.isDone ? <CheckGreen size={28} /> : null}
                          </div>
                        </div>
                        {item.subTitle && (
                          <BiExpandVertical
                            size={22}
                            fill="#249900"
                            className={`absolute right-8 ${
                              expandedTodo === item.id
                                ? "bottom-5"
                                : "top-1/2 -translate-y-1/2"
                            }  text-green-400 cursor-pointer transition-max-height duration-400 ease-in-out`}
                            onClick={() => toggleExpand(item.id)}
                          />
                        )}
                        {item.subTitle && (
                          <div
                            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                              expandedTodo === item.id ? "max-h-32" : "max-h-0"
                            }`}
                          >
                            <div className="p-4 pl-16 text-gray-300 bg-gray-800 rounded-b-lg text-[0.8rem] mt-1">
                              {item.subTitle}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="lg:hidden">
                {/* <div
                  onClick={() => setShowModal(!showModal)}
                  className="inline text-center px-12 py-2 bg-blue-500 text-white text-[1.5rem] font-normal rounded-md"
                >
                  Add new task
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Todos;

const ex = {
  todos: [
    {
      id: 1,
      done: false,
      todo: "12",
    },
  ],
};
