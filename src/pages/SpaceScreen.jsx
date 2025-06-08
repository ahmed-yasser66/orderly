import Container from "../components/Container";
import OrderControlSideBar from "../components/OrderControlSideBar";
import OrderItem from "../components/OrderItem";

export default function SpaceScreen() {
  return (
    <Container>
      <section className="grid-cols-1 grid gap-x-6 md:grid-cols-8 h-[calc(100vh_-_100px)]">
        {/* MENU */}
        <div className="col-span-6 bg-base-200 h-full rounded-xl shadow-sm px-5 py-4">
          <h1 className="font-semibold text-lg">Menu</h1>
          {/* ITEMS */}
          <div className="mt-6">
            <OrderItem/>
          </div>
        </div>
        <div className="col-span-2 h-full w-full">
          <OrderControlSideBar/>
        </div>
      </section>
    </Container>
  );
}
