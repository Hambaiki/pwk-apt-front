"use client";

import { X } from "lucide-react";

import * as React from "react";
import { cn } from "@/libs/utils";
import { cva, VariantProps } from "class-variance-authority";

const ModalContext = React.createContext<{
  isOpen: boolean;
  onClose: () => void;
} | null>(null);

const modalVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-all duration-200 ease-in-out",
  {
    variants: {
      isOpen: {
        true: "opacity-100",
        false: "opacity-0 pointer-events-none",
      },
    },
    defaultVariants: {
      isOpen: false,
    },
  }
);

interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  onClose: () => void;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
  const { className, children, isOpen, onClose, ...rest } = props;

  return (
    <ModalContext.Provider
      value={{
        isOpen: isOpen ?? false,
        onClose: onClose,
      }}
    >
      <div
        ref={ref}
        className={cn(modalVariants({ isOpen }), className)}
        {...rest}
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
});
Modal.displayName = "Modal";

const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...rest } = props;

  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("ModalHeader must be used within a Modal");
  }

  const { onClose } = context;

  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between pb-4", className)}
      {...rest}
    >
      {children}
      <button onClick={onClose} className="p-2">
        <X className="text-red-500 hover:text-red-700 transition-colors" />
      </button>
    </div>
  );
});
ModalHeader.displayName = "ModalHeader";

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <div
      ref={ref}
      className={cn("flex justify-end pt-4 transition-all")}
      {...rest}
    >
      {children}
    </div>
  );
});
ModalFooter.displayName = "ModalFooter";

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, children, ...rest } = props;

  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("ModalHeader must be used within a Modal");
  }

  const { isOpen } = context;

  return (
    <div
      ref={ref}
      className={cn(
        "bg-background-primary p-6 m-6 rounded-2xl shadow-2xl transition-all ease-in-out duration-300",
        isOpen ? "scale-100" : "scale-95",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});
ModalContent.displayName = "ModalContent";

export { Modal, ModalHeader, ModalFooter, ModalContent };
