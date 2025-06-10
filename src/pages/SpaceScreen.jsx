import { useEffect, useState } from "react";
import Container from "../components/Container";
import OrderItem from "../components/OrderItem";
import OrderSideInfo from "../components/spaceScreenInfo/OrderSideInfo";
import { useParams } from "react-router";
import { api } from "../Firebase/api_util.js";
import { setMenu } from "../features/slices/singlemenu.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function SpaceScreen() {
  const { arr } = useSelector((state) => state.single);
  console.log("arrr", arr);

  const dispatch = useDispatch();
  const spaceId = useParams().spaceId;
  const [menu, setremoteMenu] = useState([]);

  useEffect(() => {
    api.space.getMenuItems(spaceId).then((res) => {
      console.log("res is ", res);
      setremoteMenu(res);
    });
  }, [spaceId]);

  useEffect(() => {
    console.log("menu is ", menu);
    menu.forEach((m) => {
      // console.log(""m.name, m.price);
      if (arr.length === 0) {
        dispatch(setMenu({ name: m.name, price: m.price }));
      }
    });
  }, [menu]);

  return (
    <Container>
      <div
        className="bg-base-200 p-4 rounded-xl shadow-sm mb-6 cursor-pointer"
        onClick={() => {
          navigator.clipboard
            .writeText("ROOM_ID_PLACEHOLDER")
            .then(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                icon: "success",
                title: "Room ID copied to clipboard!",
              });
            })
            .catch((err) => console.error("Failed to copy: ", err));
        }}
      >
        <h2 className="font-semibold text-lg">
          Room ID: <span className="font-normal">ROOM_ID_PLACEHOLDER</span>
        </h2>
        <p className="text-sm text-gray-500">Click to copy</p>
      </div>
      <section className="grid-cols-1 gap-y-6 grid gap-x-6 md:grid-cols-8 my-10">
        {/* MENU */}
        <div className="col-span-8 md:col-span-6 bg-base-200 h-full rounded-xl shadow-sm px-5 py-4 overflow-y-scroll">
          <h1 className="font-semibold text-lg">Menu</h1>
          {/* ITEMS */}
          <div className="mt-6">
            <OrderItem menu={menu} />
          </div>
        </div>
        <div className="col-span-8 md:col-span-2 h-full w-full">
          <OrderSideInfo />
        </div>
      </section>
    </Container>
  );
}
