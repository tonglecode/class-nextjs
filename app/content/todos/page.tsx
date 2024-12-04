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
import { AddButtonHandle } from "@/utils/handles/AddButtonHandle";
import { DoneHandle } from "@/utils/handles/DoneHandle";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<ITask>();
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [expandedTodo, setExpandedTodo] = useState<number | null>(null);

  const addTodoHandle = ({ task }: { task: ITask }) => {
    if (showModal) {
      setTask(undefined);
      setShowModal(false);
    } else {
      if (task) setTask(task);
      setShowModal(true);
    }
  };
  const addButtonHandle = AddButtonHandle({
    newTodoInput,
    task,
    subTitle,
    setTodos,
    todos,
    tasks,
    setShowModal,
    setNewTodoInput,
    setSubTitle,
  });

  const doneHandle = DoneHandle({ todos, setTodos });

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
        {showModal && (
          <AddTodoModal
            task={task}
            setShowModal={setShowModal}
            setNewTodoInput={setNewTodoInput}
            setSubTitle={setSubTitle}
            addButtonHandle={addButtonHandle}
          />
        )}

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

            <div className="grid grid-cols-4 w-full text-white gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => {
                    addTodoHandle({ task });
                  }}
                >
                  <div
                    style={{ backgroundColor: task.color }}
                    className={`relative hover:ring-4 rounded-lg w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem]`}
                  >
                    {task.title}
                    <div className="absolute top-1/2 -translate-y-1/2 left-5">
                      <div className="text-3xl rounded-full flex justify-center items-center">
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
                  {todos?.map((todo, index) => {
                    return (
                      <div key={index} className="relative">
                        <div
                          onClick={() => doneHandle(todo.id)}
                          style={{
                            backgroundColor: `${
                              tasks.filter(
                                (task) => task.id === todo.taskId
                              )?.[0]?.color
                            }`,
                          }}
                          className={`relative bg-gray-900 ${
                            expandedTodo === todo.id
                              ? "rounded-t"
                              : "rounded-lg"
                          }  w-full pl-16 py-4 cursor-pointer text-white text-[1.1rem] ${
                            todo.isDone && "line-through text-opacity-30"
                          }`}
                        >
                          {todo.title}
                          <div className="absolute top-1/2 -translate-y-1/2 left-5">
                            {todo.isDone ? <CheckGreen size={28} /> : null}
                          </div>
                        </div>
                        {todo.subTitle && (
                          <BiExpandVertical
                            size={22}
                            fill="#249900"
                            className={`absolute right-8 ${
                              expandedTodo === todo.id
                                ? "bottom-5"
                                : "top-1/2 -translate-y-1/2"
                            }  text-green-400 cursor-pointer transition-max-height duration-400 ease-in-out`}
                            onClick={() => toggleExpand(todo.id)}
                          />
                        )}
                        {todo.subTitle && (
                          <div
                            className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                              expandedTodo === todo.id ? "max-h-32" : "max-h-0"
                            }`}
                          >
                            <div className="p-4 pl-16 text-gray-300 bg-gray-800 rounded-b-lg text-[0.8rem] mt-1">
                              {todo.subTitle}
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
