import { cn } from "@/libs/utils";

import React from "react";
import { easeInOut, motion } from "framer-motion";

interface CollapseProps {
  direction?: "horizontal" | "vertical";
  isOpen?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variants = {
  vertical: {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: easeInOut },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: easeInOut },
    },
  },
  horizontal: {
    open: {
      width: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: easeInOut },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.3, ease: easeInOut },
    },
  },
};

const Collapse = ({
  direction,
  isOpen,
  className,
  children,
}: CollapseProps) => {
  return (
    <motion.div
      initial={false}
      variants={variants[direction || "vertical"]}
      animate={isOpen ? "open" : "closed"}
      className={cn("overflow-hidden", className)}
    >
      {children}
    </motion.div>
  );
};

export default Collapse;
