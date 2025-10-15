"use client";

import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

type Props = {
  task: Task;
};

const TaskCard = ({ task }: Props) => {
  return (
    <div className="mb-3 rounded bg-white p-4 shadow transition-colors dark:bg-neutral-900 dark:text-gray-100">
      {/* Attachments */}
      {task.attachments && task.attachments.length > 0 && (
        <div className="mb-3">
          <strong className="text-gray-700 dark:text-gray-300">
            Attachments:
          </strong>
          <div className="mt-2 flex flex-wrap gap-2">
            {task.attachments.map((att, idx) => (
              <Image
                key={idx}
                src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${att.fileURL}`}
                alt={att.fileName}
                width={400}
                height={200}
                className="rounded-md"
              />
            ))}
          </div>
        </div>
      )}

      {/* Task Details */}
      <p>
        <strong className="text-gray-700 dark:text-gray-300">ID:</strong>{" "}
        {task.id}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Title:</strong>{" "}
        {task.title}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">
          Description:
        </strong>{" "}
        {task.description || "No description provided"}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Status:</strong>{" "}
        {task.status}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Priority:</strong>{" "}
        {task.priority}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Tags:</strong>{" "}
        {task.tags || "No tags"}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">
          Start Date:
        </strong>{" "}
        {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Due Date:</strong>{" "}
        {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Author:</strong>{" "}
        {task.author ? task.author.username : "Unknown"}
      </p>
      <p>
        <strong className="text-gray-700 dark:text-gray-300">Assignee:</strong>{" "}
        {task.assignee ? task.assignee.username : "Unassigned"}
      </p>
    </div>
  );
};

export default TaskCard;
