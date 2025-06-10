import { useEffect, useState } from "react";
import Container from "../components/Container";
import OrderItem from "../components/OrderItem";
import OrderSideInfo from "../components/spaceScreenInfo/OrderSideInfo";
import { useParams } from "react-router";
import { api } from "../Firebase/api_util.js";
import { setMenu, setUserId } from "../features/slices/singlemenu.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import UsernamePopup from "../components/userNamePopup.jsx";
import {
  addNewParticipant,
  fetchParticipants,
  listenToParticipants,
  saveParticipantOrder,
  updateParticipantOrderFromMenu,
} from "../features/slices/participantsReducer.js";
import { setCurrentSpace } from "../features/slices/adminReducer.js";

export default function SpaceScreen() {
  const { arr } = useSelector((state) => state.single);
  console.log("arrr", arr);

  const dispatch = useDispatch();
  const { spaceId } = useParams();
  const spaceLink = window.location.origin + "/space/" + spaceId;
  const [menu, setremoteMenu] = useState([]);
  const [guest, setGuest] = useState(null);
  const [showUsernamePopup, setShowUsernamePopup] = useState(false);
  const participants = useSelector((state) => state.participants);

  const menuItems = arr;
  const participantId = useSelector((state) => state.participants); // however you track the current participant

  // useEffect(() => {
  //   if (!participantId || menuItems.length === 0) return;

  //   // 1. Copy current menu to participant.selectedItems
  //   dispatch(updateParticipantOrderFromMenu({ participantId, menuItems }));

  //   // 2. Push to Firebase
  //   dispatch(
  //     saveParticipantOrder({
  //       spaceId,
  //       participantId,
  //       selectedItems: menuItems,
  //     })
  //   );
  // }, [menuItems, dispatch, participantId, spaceId]);

  useEffect(() => {
    if (spaceId) {
      const unsubscribe = dispatch(listenToParticipants(spaceId));

      return () => unsubscribe(); // 👈 cleanup listener on unmount
    }
  }, [dispatch, spaceId]);
  // useEffect(() => {
  //   if (!spaceId) return;

  //   // Listen for changes to each participant's selectedItems
  //   Object.entries(participants).forEach(([participantId, participant]) => {
  //     const selectedItems = participant.selectedItems;

  //     // Watch `selectedItems`, and push changes to Firestore
  //     if (selectedItems && selectedItems.length > 0) {
  //       api.space
  //         .pushParticipantOrder(spaceId, participantId, selectedItems)
  //         .catch((err) => console.error("Failed to push selection:", err));
  //     }
  //   });
  // }, [spaceId, useSelector((state) => state.participants)]); // 👈 triggers on any participants state change
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (participants.length > 0) {
  //       // Dispatch saveParticipantOrder for each participant
  //       participants.forEach((participant) => {
  //         dispatch(
  //           saveParticipantOrder({
  //             spaceId,
  //             participantId: participant.id,
  //             selectItems: arr,
  //           })
  //         );
  //         dispatch(fetchParticipants(spaceId));
  //       });
  //     }
  //   }, 10000); // every 10 seconds

  //   // Cleanup on unmount
  //   return () => clearInterval(interval);
  // }, [participants, dispatch, spaceId, arr]);

  useEffect(() => {
    const cameFromInside = sessionStorage.getItem("internal-nav");

    if (cameFromInside === "true") {
      console.log("✅ Came from inside the app");
      // sessionStorage.removeItem("internal-nav"); // optional cleanup
    } else {
      console.log("❌ Came directly (e.g. bookmark, reload, external link)");
      setShowUsernamePopup(true); // or whatever logic
    }
  }, []);

  const handleGuestSubmit = async (name) => {
    const joinedAt = new Date().toISOString();
    const newGuest = { name, joinedAt };
    setGuest(newGuest);
    setShowUsernamePopup(false);

    // Check for duplicate before dispatching
    const alreadyExists = participants.some(
      (p) => p.name === name && p.spaceId === spaceId
    );

    if (!alreadyExists) {
      dispatch(addNewParticipant({ name, spaceId }));
    } else {
      console.log("Participant already exists, skipping add.");
    }
  };

  useEffect(() => {
    api.space.getMenuItems(spaceId).then((res) => {
      console.log("res is ", res);
      setremoteMenu(res);
      dispatch(setCurrentSpace(spaceId));
    });
  }, [spaceId, dispatch]);

  useEffect(() => {
    console.log("menu is ", menu);
    menu.forEach((m) => {
      // console.log(""m.name, m.price);
      if (arr.length === 0) {
        dispatch(setMenu({ name: m.name, price: m.price }));
      }
    });
  }, [menu, dispatch, arr.length]);

  return (
    <Container>
      <UsernamePopup
        isOpen={showUsernamePopup}
        onClose={() => setShowUsernamePopup(false)}
        onSubmit={handleGuestSubmit}
      />
      <div
        className="bg-base-200 p-4 rounded-xl shadow-sm mb-6 cursor-pointer"
        onClick={() => {
          navigator.clipboard
            .writeText(spaceLink)
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
          Room ID: <span className="font-normal">{spaceId}</span>
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
