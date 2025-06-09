import { formatCurrency } from "../utils/formatCurrency";
import Counter from "./Counter";

export default function OrderItem({ menu }) {
  console.log("menu from inside", menu);

  return (
    <>
      {menu.map((m, ind) => {
        return (
          <div className="bg-primary-content px-6 py-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <p className="text-lg text-primary font-semibold">{m.name}</p>
              <p className="text-xs">{m.description}</p>
            </div>
            <div className="flex text-primary gap-x-6 items-center">
              <span className="font-semibold">{formatCurrency(m.price)}</span>
              <Counter ind={ind}>
                <Counter.Decrement />
                <Counter.Count />
                <Counter.Increment />
              </Counter>
            </div>
          </div>
        );
      })}
    </>
  );
}
