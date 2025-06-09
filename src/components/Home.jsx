import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../Firebase/api_util";
// import { createSpace } from "../features/slices/spaceReducer";
import { addMenuItem } from "../features/slices/menuReducer";

export default function Home() {
  const admin = useSelector((state) => state.admin);
  const space = useSelector((state) => state.space);
  const dispatch = useDispatch();
  console.log("Current admin id:", admin.id);
  // console.log("Current Firebase user id:", api.auth.);
  console.log(space);
  const handleClick = async (e) => {
    const staticNewSpace = {
      name: "pizzaHut order",
      adminId: admin.id,
      description: "Launch",
      isClosed: false,
      orders: null,
    };
    const spaceId = await api.space.createSpace(staticNewSpace);
    staticNewSpace.id = spaceId;
    // dispatch(createSpace(staticNewSpace));
    console.log(spaceId);
  };
  const showSpaces = async () => {
    const adminSpaces = await api.order.getSpacesByAdmin(admin.id);
    console.log(adminSpaces);
  };
  const showOrders = async () => {
    const adminFavOrders = await api.order.getFavouritesOrders(admin.id);
    console.log(adminFavOrders);
  };
  const addItem = async () => {
    // console.log(space);
    await api.space.addMenuItem(space.id, "1", { name: "foul", price: 6 });
    dispatch(addMenuItem({ id: "1", name: "foul", price: 6 }));
  };

  return (
    <>
      <h1>the recent logged in user id = {admin.id}</h1>
      <button className="btn p-5 m-5" onClick={handleClick}>
        create Space
      </button>

      <button className="btn p-5 m-5" onClick={addItem}>
        Add Menue Item
      </button>
      <button className="btn p-5 m-5" onClick={showSpaces}>
        show my Spaces
      </button>

      <button className="btn p-5 m-5" onClick={showOrders}>
        show my orders
      </button>
    </>
  );
}
