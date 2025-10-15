"use client";

import {
  Task as TaskType,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/state/api";
import { format } from "date-fns";
import { EllipsisVertical, MessageSquareMore, Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading)
    return <div className="text-gray-700 dark:text-gray-300">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 dark:text-red-400">
        An error occurred while fetching tasks
      </div>
    );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

type TaskColumnProps = {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item: { id: number }) => moveTask(item.id, status),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [status],
  );

  drop(ref);

  const tasksCount = tasks.filter((task) => task.status === status).length;

  const statusColor: Record<string, string> = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={ref}
      className={`rounded-lg py-2 transition-colors xl:px-2 ${
        isOver ? "bg-blue-50 dark:bg-neutral-900" : ""
      }`}
    >
      <div className="mb-3 flex w-full">
        <div
          className="w-2 rounded-s-lg"
          style={{ backgroundColor: statusColor[status] }}
        />
        <div className="flex w-full items-center justify-between rounded-e-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-800 dark:bg-neutral-900">
          <h3 className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-100">
            {status}{" "}
            <span className="ml-2 inline-block h-6 w-6 rounded-full bg-gray-200 p-1 text-center text-sm leading-none text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              {tasksCount}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="flex h-6 w-6 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <EllipsisVertical size={20} />
            </button>
            <button
              className="flex h-6 w-6 items-center justify-center rounded bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

type TaskProps = {
  task: TaskType;
};

const Task = ({ task }: TaskProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "task",
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task.id],
  );

  drag(ref);

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  const PriorityTag = ({ priority }: { priority: TaskType["priority"] }) => {
    const colorMap: Record<string, string> = {
      Urgent: "bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200",
      High: "bg-yellow-200 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
      Medium:
        "bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-200",
      Low: "bg-blue-200 text-blue-700 dark:bg-blue-900 dark:text-blue-200",
      Default: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
    };
    const color = colorMap[priority ?? "Default"];
    return (
      <div className={`rounded-full px-2 py-1 text-xs font-semibold ${color}`}>
        {priority}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={`mb-4 rounded-md border border-gray-200 bg-white shadow-sm transition-opacity dark:border-gray-800 dark:bg-neutral-900 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.attachments[0].fileURL}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}

      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className="flex gap-2">
              {taskTagsSplit.map((tag) => (
                <div
                  key={tag}
                  className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button className="flex h-6 w-6 items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <EllipsisVertical size={20} />
          </button>
        </div>

        <div className="my-3 flex justify-between">
          <h4 className="text-md font-bold text-gray-900 dark:text-gray-100">
            {task.title}
          </h4>
          {typeof task.points === "number" && (
            <div className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              {task.points} pts
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formattedStartDate && <span>{formattedStartDate} - </span>}
          {formattedDueDate && <span>{formattedDueDate}</span>}
        </div>

        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {task.description}
        </p>

        <div className="mt-4 border-t border-gray-200 dark:border-gray-700" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Image
                key={task.assignee.userId}
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.assignee.profilePictureUrl!}`}
                alt={task.assignee.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-neutral-900"
              />
            )}
            {task.author && (
              <Image
                key={task.author.userId}
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${task.author.profilePictureUrl!}`}
                alt={task.author.username}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full border-2 border-white object-cover dark:border-neutral-900"
              />
            )}
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MessageSquareMore size={18} />
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-300">
              {numberOfComments}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardView;
