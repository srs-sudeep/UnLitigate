import { createContext, useContext } from "react";

type TransitionValue = {
  transitioning: boolean;
};

const TransitionContext = createContext<TransitionValue>({
  transitioning: false,
});

export const TransitionProvider = TransitionContext.Provider;

export function usePageTransition() {
  return useContext(TransitionContext);
}
