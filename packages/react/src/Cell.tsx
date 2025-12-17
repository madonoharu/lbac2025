import { useRef, useEffect } from "react";
import type { Dot } from "./lib";

interface Props {
  dot: Dot;
}

export default function Cell({ dot }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    dot.setElem(ref.current);

    return () => {
      dot.elem = undefined;
    };
  }, []);

  return <div ref={ref} className="cell"></div>;
}
