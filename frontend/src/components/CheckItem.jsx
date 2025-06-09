import { useState } from "react";
import Counter from "./Counter";

export default function CheckItem({ name = "fava beans sandwitch" }) {
  const [isChecked, setIsChecked] = useState(false);
  console.log(isChecked)
  return (
    <div className="flex justify-between p-5">
      <div className="flex gap-5 items-center">
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
        />
        <span className="font-semibold">{name}</span>
      </div>
      <Counter>
        <Counter.Decrement />
        <Counter.Count />
        <Counter.Increment />
      </Counter>
    </div>
  );
}
