"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./logo";
import { NavList } from "./nav-list";

export function Drawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="fixed inset-y-0 left-0 z-50 w-72 bg-cultiva-darkGreen text-white lg:hidden"
            role="dialog"
            aria-label="Menu de navigation"
          >
            <div className="p-5 border-b border-white/10">
              <Logo dark />
            </div>
            <NavList onNavigate={onClose} />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
