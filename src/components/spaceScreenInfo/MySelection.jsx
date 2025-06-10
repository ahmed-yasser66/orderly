import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import { useEffect, useState } from "react";
export default function MySelection() {
  const { arr, total } = useSelector((state) => state.single);
  const myMenu = arr;

  useEffect(() => {}, [myMenu]);
  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">My Selections</p>
<<<<<<< HEAD

      {myMenu.map((m) => {
        // setTotal(total + m.price * m.quantity);

        if (m.quantity === 0) return null;
        else {
          return (
            <div className="flex justify-between">
              <span>{m.name}</span>
              <span>{formatCurrency(m.price * m.quantity)}</span>
            </div>
          );
        }
      })}

      {/* DECORATION LINE */}
=======
      {/* START ITEMS */}
      <div className="items flex flex-col gap-y-2 overflow-y-scroll">
        <div className="flex justify-between">
          <span>ITEM NAME</span>
          <span>{formatCurrency(20)}</span>
        </div>
        <div className="flex justify-between">
          <span>ITEM NAME</span>
          <span>{formatCurrency(12)}</span>
        </div>
      </div>
      {/* END ITEMS */}
      {/* START DECORATION LINE */}
>>>>>>> 49d8deb31d5ad5629c61cbc861a107e100cae69d
      <div className="h-[1px] w-full bg-base-content/25 my-6" />
      {/* END DECORATION LINE */}
      <div className="flex justify-between font-semibold text-secondary">
        <span>My Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
