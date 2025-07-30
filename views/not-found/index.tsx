"use client";

import { FC } from "react";

interface NotFoundProps {
  name?: string;
}

export const NotFound: FC<NotFoundProps> = ({ name }) => (
  <div className="not-found flex flex-col items-center justify-center gap-2 min-h-[calc(100vh-var(--header-height))] h-full w-full">
    <div className="text-6xl font-bold text-black">404</div>
    <div className="text-xl font-semibold text-slate-600">Not Found</div>
    <div className="text-sm font-medium text-slate-600">
      Oops... We couldn't find{" "}
      {name ? `this ${name}` : "what you're looking for"}
    </div>
  </div>
);
