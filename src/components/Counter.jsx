import { createContext, useContext, useState } from "react";
import { MinusIcon, PlusIcon } from "../assets/icons";
import { toArabicNumeral } from "../utils/toArabicNumber";

const CounterContext = createContext();

function Counter({ children }) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => (count === 0 ? 0 : count - 1));

  return (
    <CounterContext.Provider value={{ increment, decrement, count }}>
      <div className="flex items-center content-center select-none w-fit rounded-sm overflow-clip text-primary">
        {children}
      </div>
    </CounterContext.Provider>
  );
}

function Increment() {
  const { increment } = useContext(CounterContext);
  return (
    <div
      onClick={() => increment()}
      className="bg-base-200 size-8 flex items-center justify-center cursor-pointer"
    >
      <PlusIcon />
    </div>
  );
}
function Decrement() {
  const { decrement } = useContext(CounterContext);

  return (
    <div
      onClick={() => decrement()}
      className="bg-base-200 size-8 flex items-center justify-center cursor-pointer"
    >
      <MinusIcon />
    </div>
  );
}
function Count() {
  const { count } = useContext(CounterContext);
  return (
    <div className="bg-primary-content size-8 text-lg text-center leading-8 font-semibold">
      {toArabicNumeral(count)}
    </div>
  );
}
Counter.Increment = Increment;
Counter.Decrement = Decrement;
Counter.Count = Count;

export default Counter;
