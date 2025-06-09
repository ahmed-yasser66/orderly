import { HourGlass } from "../../assets/icons";
import Avatar from "../Avatar";

export default function Participants() {
  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">Participants</p>
      {/* items WRAPPER */}
      <div className="wrapper flex flex-col gap-y-4 justify-between mt-6 items-center">
        <div className="item flex justify-between w-full items-center">
          <div className="flex items-center gap-4">
            <Avatar title="John Doe" />
            John Doe
          </div>
          <HourGlass />
        </div>

        <div className="item flex justify-between w-full items-center">
          <div className="flex items-center gap-4">
            <Avatar title="John Doe" />
            John Doe
          </div>
          <HourGlass />
        </div>
      </div>
    </div>
  );
}
