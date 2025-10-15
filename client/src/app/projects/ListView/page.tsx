"use client";

import Header from "@/components/Header/page";
import TaskCard from "@/components/TaskCard/page";
import { Task, useGetTasksQuery } from "@/state/api";

type Props = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ListView = ({ id, setIsModalNewTaskOpen }: Props) => {
  const {
    data: tasks,
    error,
    isLoading,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading)
    return (
      <div className="flex h-[70vh] items-center justify-center text-gray-600 dark:text-gray-400">
        Loading tasks...
      </div>
    );

  if (error)
    return (
      <div className="flex h-[70vh] items-center justify-center text-red-500 dark:text-red-400">
        An error occurred while fetching tasks.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-8 transition-colors xl:px-6 dark:bg-neutral-950">
      {/* Header Section */}
      <div className="pt-5">
        <Header
          name="List"
          buttonComponent={
            <button
              className="bg-blue-primary flex items-center rounded px-3 py-2 text-white transition-colors hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>

      {/* Task List */}
      {tasks && tasks.length > 0 ? (
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {tasks.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex h-[50vh] items-center justify-center text-gray-500 dark:text-gray-400">
          No tasks found. Click{" "}
          <span className="mx-1 font-semibold text-blue-500">Add Task</span> to
          create one.
        </div>
      )}
    </div>
  );
};

export default ListView;
