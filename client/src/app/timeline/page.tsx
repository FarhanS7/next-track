"use client";

import { useAppSelector } from "@/app/redux";
import Header from "@/components/Header/page";
import { useGetProjectsQuery } from "@/state/api";
import { DisplayOption, Gantt, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: projects, isLoading, isError } = useGetProjectsQuery();

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskTypeItems,
        progress: 50,
        isDisabled: false,
        styles: {
          backgroundColor: isDarkMode ? "#374151" : "#4f46e5",
          backgroundSelectedColor: isDarkMode ? "#4b5563" : "#6366f1",
          progressColor: isDarkMode ? "#10b981" : "#22c55e",
          progressSelectedColor: isDarkMode ? "#34d399" : "#4ade80",
        },
      })) || []
    );
  }, [projects, isDarkMode]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  if (isLoading) return <div className="dark:text-white">Loading...</div>;
  if (isError || !projects)
    return (
      <div className="dark:text-white">
        An error occurred while fetching projects
      </div>
    );

  return (
    <div className="max-w-full p-8 dark:bg-black">
      <header className="mb-4 flex items-center justify-between">
        <Header name="Projects Timeline" />
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow dark:bg-gray-800 dark:text-white">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            barBackgroundColor={isDarkMode ? "#374151" : "#aeb8c2"}
            barBackgroundSelectedColor={isDarkMode ? "#4b5563" : "#9ba1a6"}
            barCornerRadius={4}
            fontSize={isDarkMode ? "14px" : "12px"}
            fontFamily={isDarkMode ? "'Inter', sans-serif" : "Arial"}
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
