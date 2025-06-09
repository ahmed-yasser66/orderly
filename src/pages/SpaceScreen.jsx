import Container from "../components/Container";
import OrderItem from "../components/OrderItem";
import OrderSideInfo from "../components/spaceScreenInfo/OrderSideInfo";

export default function SpaceScreen() {
  return (
    <Container>
      <section className="grid-cols-1 gap-y-6 grid gap-x-6 md:grid-cols-8 my-10">
        {/* MENU */}
        <div className="col-span-8 md:col-span-6 bg-base-200 h-full rounded-xl shadow-sm px-5 py-4 overflow-y-scroll">
          <h1 className="font-semibold text-lg">Menu</h1>
          {/* ITEMS */}
          <div className="mt-6">
            <OrderItem/>
          </div>
        </div>
        <div className="col-span-8 md:col-span-2 h-full w-full">
          <OrderSideInfo/>
        </div>
      </section>
    </Container>
  );
}
