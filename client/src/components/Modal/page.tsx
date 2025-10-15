"use client";

import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";
import Header from "../Header/page";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  name: string;
};

const Modal = ({ children, isOpen, onClose, name }: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="bg-opacity-50 fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-4 shadow-lg transition-colors dark:bg-neutral-900">
        <Header
          name={name}
          buttonComponent={
            <button
              className="bg-blue-primary flex h-7 w-7 items-center justify-center rounded-full text-white transition-colors hover:bg-blue-600"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          }
          isSmallText
        />
        <div className="mt-2">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
