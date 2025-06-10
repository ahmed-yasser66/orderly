import Button from "../Button";
import MySelection from "./MySelection";
import CollectiveOrder from "./CollectiveOrder";
import Participants from "./Participants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setFinalizedOrder } from "../../features/slices/orderSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { api } from "../../Firebase/api_util";
export default function OrderSideInfo() {
  const { total, arr } = useSelector((state) => state.single);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinalizeOrder = async () => {
    await api
      // Dispatch a dummy finalized order for testing
      .dispatch(
        setFinalizedOrder({
          orderName: "Test Order",
          restaurant: "Test Restaurant",
          collectiveOrder: [
            { qty: 2, itemName: "Burger", pricePerItem: 10.0, subtotal: 20.0 },
            { qty: 1, itemName: "Fries", pricePerItem: 3.0, subtotal: 3.0 },
          ],
          grandTotal: 23.0,
          participantOrders: [
            {
              name: "Alice",
              initials: "A",
              items: [{ qty: 2, itemName: "Burger" }],
              total: 20.0,
            },
            {
              name: "Bob",
              initials: "B",
              items: [{ qty: 1, itemName: "Fries" }],
              total: 3.0,
            },
          ],
        })
      );
    navigate("/finalized-order");
  };

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
          onClick={handleFinalizeOrder}
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
