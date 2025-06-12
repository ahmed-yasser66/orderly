import { useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { debounce } from "lodash";
import { db } from "../firebase"; // your Firebase config
import { doc, setDoc } from "firebase/firestore";

export function useSyncOrderToFirebase(userId) {
  const order = useSelector((state) => state.singlemenu.arr);

  const debouncedPush = useRef(
    debounce(async (data) => {
      await setDoc(doc(db, "orders", userId), { items: data });
      console.log("Pushed to Firebase:", data);
    }, 2000) // waits 2 seconds after last change
  ).current;

  useEffect(() => {
    if (order.length > 0) {
      debouncedPush(order);
    }
  }, [order, debouncedPush]);

  useEffect(() => {
    return () => debouncedPush.cancel(); // cleanup
  }, [debouncedPush]);
}
