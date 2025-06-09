import { useEffect, useState } from "react";
import Container from "../components/Container";
import OrderItem from "../components/OrderItem";
import OrderSideInfo from "../components/spaceScreenInfo/OrderSideInfo";
import { useParams } from "react-router";
import { api } from "../Firebase/api_util.js";
import { setMenu } from "../features/slices/singlemenu.js";
import { useDispatch } from "react-redux";
export default function SpaceScreen() {
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

      dispatch(setMenu({ name: m.name, price: m.price }));
    });
    setMenu();
  }, [menu]);

  return (
    <Container>
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
