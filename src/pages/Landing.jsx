import Button from "../components/Button";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import RecentOrder from "../components/RecentOrder";

export default function Landing() {
  return (
    <Container>
      <section className="h-[calc(100vh_-_250px)]">
        <p className="text-lg lg:text-3xl mb-6 font-semibold">Recent Spaces</p>

        <div className="w-full h-4/6 bg-base-300/35 rounded-box overflow-y-scroll shadow-sm">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead className="font-bold">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Created At</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <RecentOrder />
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Pagination />
        </div>
        <div className="flex justify-center sm:justify-end mt-6">
          <Button
            children={"Create New Space!"}
            variant="accent"
            className="!p-5"
          />
        </div>
      </section>
    </Container>
  );
}
