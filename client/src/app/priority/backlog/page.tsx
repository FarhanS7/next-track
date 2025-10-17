import React from "react";
import ReusablePriorityPage from "../reusablePriorityPage/page";
import { Priority } from "@/state/api";

const Urgent = () => {
  return <ReusablePriorityPage priority={Priority.Backlog} />;
};

export default Urgent;