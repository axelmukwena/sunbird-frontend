"use client";

import { Provider } from "jotai";
import React, { ReactElement, ReactNode } from "react";

interface JotaiRootWrapperProps {
  children: ReactNode;
}

const JotaiRootWrapper = ({
  children,
}: JotaiRootWrapperProps): ReactElement<unknown> => (
  <Provider>{children}</Provider>
);

export default JotaiRootWrapper;
