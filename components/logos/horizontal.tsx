import Link from "next/link";
import { FC } from "react";

import { LogoMark } from "./mark";
import { LogoWord } from "./word";

interface LogoHorizontalProps {
  markWidth?: number;
  wordWidth?: number;
  showMark?: boolean;
  showWord?: boolean;
  gap?: number;
}

export const LogoHorizontal: FC<LogoHorizontalProps> = ({
  markWidth = 43,
  wordWidth = 100,
  showMark = true,
  showWord = true,
  gap = 8,
}) => (
  <Link href="/" className="w-fit">
    <div className="flex flex-row items-center justify-start" style={{ gap }}>
      {showMark && <LogoMark width={markWidth} />}
      {showWord && <LogoWord width={wordWidth} />}
    </div>
  </Link>
);
