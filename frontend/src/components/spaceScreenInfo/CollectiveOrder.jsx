import { formatCurrency } from "../../utils/formatCurrency";
import { toArabicNumeral } from "../../utils/toArabicNumber";

export default function CollectiveOrder() {
  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">Collective Order</p>
      {/* ITEMS */}
      <div className="flex justify-between">
        <span>ITEM NAME</span>
        <span className="text-lg">x {toArabicNumeral(3)}</span>
      </div>
      <div className="flex justify-between">
        <span>ITEM NAME</span>
        <span className="text-lg">x {toArabicNumeral(2)}</span>
      </div>
      {/* DECORATION LINE */}
      <div className="h-[1px] w-full bg-base-content/25 my-6" />
      <div className="flex justify-between font-semibold text-secondary">
        <span>Grand Total</span>
        <span>{formatCurrency(80)}</span>
      </div>
    </div>
  );
}
