"use client";

import { FC, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster as Sonner } from "sonner";

export const Toaster: FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(
    <Sonner closeButton className="toaster" richColors={false} />,
    document.body,
  );
};
