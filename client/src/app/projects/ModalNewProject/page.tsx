"use client";

import Modal from "@/components/Modal/page";
import { useCreateProjectMutation } from "@/state/api";
import { formatISO } from "date-fns";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async () => {
    if (!projectName || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    await createProject({
      name: projectName,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });
    onClose();
  };

  const isFormValid = () => {
    return !!projectName && !!description && !!startDate && !!endDate;
  };

  const inputStyles =
    "mb-4 w-full rounded border border-gray-300 p-2 shadow-sm transition-colors focus:outline-none focus:ring-1 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:ring-blue-400";

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={inputStyles}
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          className={inputStyles}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="date"
            className={inputStyles}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <input
            type="date"
            className={inputStyles}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid() || isLoading}
          className={`bg-blue-primary mt-4 w-full rounded-md px-4 py-2 text-white shadow-sm transition-colors hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none ${
            !isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
