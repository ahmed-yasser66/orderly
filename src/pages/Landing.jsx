import { useNavigate } from "react-router";
import Button from "../components/Button";
import Container from "../components/Container";
import Pagination from "../components/Pagination";
import RecentOrder from "../components/RecentOrder";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminData } from "../features/slices/adminReducer";
import { fetchAdminSpaces, setSpaces } from "../features/slices/spaceReducer";

export default function Landing() {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const spaceList = useSelector((state) => state.space.spaces);
  const dispatch = useDispatch();
  console.log(spaceList);
  console.log(admin.id);
  useEffect(() => {
    if (admin.id) {
      dispatch(fetchAdminSpaces(admin.id));
    }
  }, [admin.id, dispatch]);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // console.log(admin.spaces);
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
                  <th>Space ID</th>
                  <th>Created At</th>
                  <th>Total</th>
                </tr>
              </thead>
              {/* Af2MclTG6WsicotlmLfu 
              SGUb0AUFB9d2UWTIM05l */}
              <tbody>
                {spaceList.map((space, index) => (
                  <RecentOrder
                    key={space.id}
                    idx={index + 1}
                    id={space.id}
                    date={formatDate(space.createdAt)}
                    total={500} // Replace with real total if needed
                  />
                ))}
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
            onClick={() => navigate("/create-space")}
          />
        </div>
      </section>
    </Container>
  );
}
