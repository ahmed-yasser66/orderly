import { HourGlass } from "../assets/icons";
import Avatar from "./Avatar";
import Button from "./Button";
import { formatCurrency } from "../utils/formatCurrency";
import { toArabicNumeral } from "../utils/toArabicNumber";

export default function OrderControlSideBar() {
  return (
    <aside className="flex flex-col justify-between gap-y-6">
      {/* MY SELECTION */}
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
      {/* COLLECTIVE ORDER */}
      <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
        <p className="text-lg font-semibold text-secondary">My Selections</p>
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
      {/* Participants */}
      <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
        <p className="text-lg font-semibold text-secondary">Participants</p>
        {/* items WRAPPER */}
        <div className="wrapper flex flex-col gap-y-4 justify-between mt-6 items-center">
          <div className="item flex justify-between w-full items-center">
            <div className="flex items-center gap-4">
              <Avatar />
              John Doe
            </div>
            <HourGlass />
          </div>

          <div className="item flex justify-between w-full items-center">
            <div className="flex items-center gap-4">
              <Avatar />
              John Doe
            </div>
            <HourGlass />
          </div>
        </div>
      </div>
      {/* CONTROLS */}
      <div className="flex justify-between mt-4">
        <Button type="primary" children={"Finalize Order"} className="!p-5 text-sm"/>
        <Button variant="warning" children={"Cancel Order"} className="!p-5 text-sm" />
      </div>
    </aside>
  );
}
