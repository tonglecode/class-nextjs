import axios from "axios";

export const createTodoFatch = async ({
  taskId,
  title,
  subTitle,
}: {
  taskId: number;
  title: string;
  subTitle: string;
}) => {
  const token = localStorage.getItem("qid");
  if (token) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}createTodo`,
      { taskId, title, subTitle, isDone: false },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.todo;
  }
};
