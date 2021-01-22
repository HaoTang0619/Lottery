import { useEffect, useState } from "react";

export default function useCounter(init) {
  const [count, setCount] = useState(parseInt(init, 10) || 0);

  useEffect(() => {
    let interval;
    if (count > 0) {
      interval = setInterval(() => {
        setCount((c) => c - 1);
      }, 1000);
    }
    return () => clearTimeout(interval);
  }, [count > 0]);

  return [count, setCount];
}
