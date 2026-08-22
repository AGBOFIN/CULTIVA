"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Supprimer",
  cancelLabel = "Annuler",
  busy = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div className="absolute inset-0 bg-black/50" onClick={onCancel} aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
          >
            <div className="w-11 h-11 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">{message}</p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={onCancel} disabled={busy}>
                {cancelLabel}
              </Button>
              <Button variant="danger" onClick={onConfirm} disabled={busy}>
                {busy ? "Suppression..." : confirmLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
