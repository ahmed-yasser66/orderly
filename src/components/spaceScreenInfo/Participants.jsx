import { useDispatch, useSelector } from "react-redux";
import { HourGlass } from "../../assets/icons";
import Avatar from "../Avatar";
import { useEffect } from "react";
import {
  fetchParticipants,
  saveParticipantOrder,
  selectItem,
} from "../../features/slices/participantsReducer";

export default function Participants() {
  // const spaceId = useSelector((state) => state.admin.currentSpace);
  // const { arr } = useSelector((state) => state.singlemenu);
  // console.log();
  // const dispatch = useDispatch();
  const dispatch = useDispatch();
  const participants = useSelector((state) => state.participants);
  const spaceId = useSelector((state) => state.admin.currentSpace);

  useEffect(() => {
    // Fetch participants when component mounts
    dispatch(fetchParticipants(spaceId));
  }, [dispatch, spaceId]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (participants.length > 0) {
  //       // Dispatch saveParticipantOrder for each participant
  //       participants.forEach((participant) => {
  //         dispatch(
  //           saveParticipantOrder({
  //             spaceId,
  //             participantId: participant.id,
  //             selectItems: participant.selectedItems,
  //           })
  //         );
  //         dispatch(fetchParticipants(spaceId));
  //       });
  //     }
  //   }, 10000); // every 10 seconds

  //   // Cleanup on unmount
  //   return () => clearInterval(interval);
  // }, [participants, dispatch]);

  //

  return (
    <div className="bg-base-200 px-6 py-4 shadow-sm rounded-xl">
      <p className="text-lg font-semibold text-secondary">Participants</p>

      {/* items WRAPPER */}
      <div className="wrapper flex flex-col gap-y-2 justify-between mt-6 items-center overflow-y-scroll max-h-80">
        {participants.length === 0 ? (
          <p className="text-sm text-gray-500">No participants yet.</p>
        ) : (
          participants.map((participant) => (
            <div
              key={participant.id}
              className="item flex justify-between w-full items-center"
            >
              <div className="flex items-center gap-4">
                <Avatar title={participant.name} />
                {participant.name}
              </div>
              <HourGlass />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
