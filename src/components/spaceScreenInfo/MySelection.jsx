import { formatCurrency } from "../../utils/formatCurrency";

export default function MySelection() {
  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">My Selections</p>
      {/* ITEMS */}
      <div className="flex justify-between">
        <span>ITEM NAME</span>
        <span>{formatCurrency(20)}</span>
      </div>
      <div className="flex justify-between">
        <span>ITEM NAME</span>
        <span>{formatCurrency(12)}</span>
      </div>
      {/* DECORATION LINE */}
      <div className="h-[1px] w-full bg-base-content/25 my-6" />
      <div className="flex justify-between font-semibold text-secondary">
        <span>My Total</span>
        <span>{formatCurrency(32)}</span>
      </div>
    </div>
  );
}
