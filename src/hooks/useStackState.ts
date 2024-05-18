// useStackState.ts
import { useState } from "react";
import { Stack } from "../utils/Stack";

function useStackState<T>(initialStack: Stack<T>) {
  const [stack, setStack] = useState<Stack<T>>(initialStack);

  function push(item: T) {
    const newStack = stack.clone();
    newStack.push(item);
    setStack(newStack);
    return newStack.size();
  }

  function pop() {
    if (!stack.isEmpty()) {
      const newStack = stack.clone();
      const lastItem = newStack.pop();
      setStack(newStack);
      return lastItem;
    }
    return undefined;
  }

  function peek() {
    if (!stack.isEmpty()) {
      return stack.peek();
    }
    return undefined;
  }

  const controls = {
    push,
    pop,
    peek,
    size: stack.size(),
  };

  return [stack, controls] as const;
}

export default useStackState;