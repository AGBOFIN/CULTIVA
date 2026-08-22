"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getUnreadCount } from "@/services/notifications";

/**
 * Nombre de notifications non lues. Se rafraîchit à chaque changement de
 * route (le pathname est une dépendance) pour refléter le marquage lu.
 */
export function useUnreadCount(): number {
  const pathname = usePathname();
  const [count, setCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    getUnreadCount()
      .then((value) => {
        if (!cancelled) setCount(value);
      })
      .catch(() => {
        if (!cancelled) setCount(0);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return count;
}
