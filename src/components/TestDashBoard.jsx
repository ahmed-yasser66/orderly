import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData } from "../features/slices/adminReducer";

export default function TestDashBoard() {
  const adminId = useSelector((state) => state.admin.id);
  const spaces = useSelector((state) => state.admin.spaces);
  const orders = useSelector((state) => state.admin.orders);
  const status = useSelector((state) => state.admin.status);
  const error = useSelector((state) => state.admin.error);
  const dispatch = useDispatch();
  useEffect(() => {
    if (adminId) {
      dispatch(fetchAdminData(adminId));
    }
  }, [adminId, dispatch]);

  return (
    <div>
      <h1>Admin ID: {adminId}</h1>
      <h2>Status: {status}</h2>
      {status === "failed" && <p>Error: {error}</p>}

      <h3>Spaces:</h3>
      <ul>
        {spaces.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>

      <h3>Orders:</h3>
      <ul>
        {orders.map((order, index) => (
          <li key={index}>{JSON.stringify(order)}</li>
        ))}
      </ul>
    </div>
  );
}
