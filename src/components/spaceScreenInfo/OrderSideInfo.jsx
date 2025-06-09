import Button from "../Button";
import MySelection from "./MySelection";
import CollectiveOrder from "./CollectiveOrder";
import Participants from "./Participants";

export default function OrderSideInfo() {
  return (
    <aside className="flex flex-col justify-between gap-y-6">
      <MySelection />
      {/* COLLECTIVE ORDER */}
      <CollectiveOrder />
      {/* Participants */}
      <Participants />
      {/* CONTROLS */}
      <div className="flex flex-col gap-y-6 xl:flex-row justify-center  gap-x-6 md:justify-between mt-4">
        <Button
          type="primary"
          children={"Finalize Order"}
          className="!p-5 text-sm"
        />
        <Button
          variant="warning"
          children={"Cancel Order"}
          className="!p-5 text-sm"
        />
      </div>
    </aside>
  );
}
