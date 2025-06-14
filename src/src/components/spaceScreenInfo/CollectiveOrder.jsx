import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { toArabicNumeral } from "../../utils/toArabicNumber";

export default function CollectiveOrder() {
  const { arr, total } = useSelector((state) => state.single);
  const menuItems = arr;
  //

  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">Collective Order</p>
      {/* START ITEMS */}
      <div className="items flex flex-col gap-y-2 overflow-y-scroll">
        <div className="items flex flex-col gap-y-2 max-h-48 overflow-y-auto my-4 pr-2">
          {menuItems && menuItems.length > 0 ? (
            menuItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="text-lg font-mono">x {item.quantity}</span>
              </div>
            ))
          ) : (
            <p className="text-base-content/60">No items in the order yet.</p>
          )}
        </div>
      </div>
      {/* END ITEMS */}
      {/* START DECORATION LINE */}
      <div className="h-[1px] w-full bg-base-content/25 my-6" />
      {/* END DECORATION LINE */}
      <div className="flex justify-between font-semibold text-secondary">
        <span>Grand Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
