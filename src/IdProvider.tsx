import React, { createContext, useContext, useState } from "react";

// Define the CounterContext
interface CounterContextType {
  counter: number;
  incrementCounter: () => void;
}

const CounterContext = createContext<CounterContextType | undefined>(undefined);

// Custom Hook to access the CounterContext
const useCounter = (): CounterContextType => {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error("useCounter must be used within a CounterProvider");
  }
  return context;
};

interface CounterProviderProps {
  children: React.ReactNode;
  initialCounter: number;
}

const CounterProvider = ({
  children,
  initialCounter,
}: CounterProviderProps) => {
  const [counter, setCounter] = useState(initialCounter);

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const contextValue: CounterContextType = {
    counter,
    incrementCounter,
  };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
};
export { useCounter, CounterProvider };
