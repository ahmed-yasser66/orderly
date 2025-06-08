import { formatCurrency } from "../utils/formatCurrency";
import Counter from "./Counter";

export default function OrderItem() {
  return (
    <div className="bg-primary-content px-6 py-4 rounded-lg flex justify-between items-center shadow-sm">
      <div>
        <p className="text-lg text-primary font-semibold">Marherita Pizza</p>
        <p className="text-xs">Marherita Pizza</p>
      </div>
      <div className="flex text-primary gap-x-6 items-center">
        <span className="font-semibold">{formatCurrency(12.5)}</span>
        <Counter>
          <Counter.Decrement/>
          <Counter.Count/>
          <Counter.Increment/>
        </Counter>
      </div>
    </div>
  )
}