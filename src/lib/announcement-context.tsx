"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface AnnouncementContextType {
  dismissed: boolean;
  dismiss: () => void;
}

const AnnouncementContext = createContext<AnnouncementContextType>({
  dismissed: false,
  dismiss: () => {},
});

const STORAGE_KEY = "equive-announcement-dismissed";

export function AnnouncementProvider({ children }: { children: ReactNode }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored === "true") {
      setDismissed(true);
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
  };

  return (
    <AnnouncementContext.Provider value={{ dismissed, dismiss }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncement() {
  return useContext(AnnouncementContext);
}
