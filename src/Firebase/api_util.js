import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  sendEmailVerification,

} from "firebase/auth";

import { auth, provider, db } from "../Firebase/config"; // Ensure `provider` is the Google provider
import { ADMIN_KEY, MENUEITEMS_TBL, PARTICIPANTS_TBL, SPACES_TBL } from "../Firebase/tables"
export const api = {
  auth: {
    // Email Sign-Up
    signUp: async (email, password) => {

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Send verification email
      await sendEmailVerification(user);

      return userCredential; // You can also return a success message if needed
    },
    isInUse: async (email) => {

    },
    isValidFormat: (email) => {
      return String(email)
        ?.toLowerCase()
        ?.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
    resendVerification: async () => {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
      }
    },
    // Email Login with Remember Me option
    login: async (email, password, rememberMe = false) => {
      const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistence);
      return await signInWithEmailAndPassword(auth, email, password);
    },

    // Google Sign-In
    loginWithGoogle: async () => {
      return await signInWithPopup(auth, provider);
    },

    // Password Reset
    resetPassword: async (email) => {
      return await sendPasswordResetEmail(auth, email);
    },

    // Optional: Logout
    logout: async () => {
      return await auth.signOut();
    }
  },

  space: {
    // Create a new space with a known ID (usually generated UUID)
    //{adminId,description,isColsed}
    createSpace: async (newSpace) => {
      // Reference a new document with auto-generated ID
      const newSpaceDoc = doc(collection(db, SPACES_TBL));
      // Get the auto-generated ID
      const spaceId = newSpaceDoc.id;

      await setDoc(newSpaceDoc, {
        ...newSpace,
        createdAt: new Date().toISOString(), // Use serverTimestamp() if you want to use Firestore's server time
        orders: [],
        adminId: newSpace.adminId, // Ensure adminId is included
        status: 'active', // Default status
      });

      // Step 4: Fetch the saved document
      const space = await getDoc(newSpaceDoc);
      const data = space.data();

      // Convert createdAt Timestamp to ISO string or Date
      // const createdAt = data.createdAt ? data.createdAt.toDate().toISOString() : null;

      return {
        id: spaceId,
        ...data,
      };
    },

    // Add a menu item to a space
    addMenuItem: async (spaceId, itemId, itemData) => {
      await setDoc(doc(db, SPACES_TBL, spaceId, MENUEITEMS_TBL, itemId), itemData);
    },

    // Add a participant (with generated or custom ID)
    addParticipant: async (spaceId, name) => {
      const participantsCollectionRef = collection(db, SPACES_TBL, spaceId, PARTICIPANTS_TBL);

      // Add the document and get its reference
      const newParticipantDoc = { name, joinedAt: new Date().toISOString(), selectedItems: [] };
      const docRef = await addDoc(participantsCollectionRef, newParticipantDoc);
      newParticipantDoc.id = docRef.id; // Add the auto-generated ID to the participant object

      // ✅ Return the auto-generated document ID
      return newParticipantDoc;
    },

    // Get all participants in a space
    getParticipants: async (spaceId) => {
      const snapshot = await getDocs(collection(db, SPACES_TBL, spaceId, PARTICIPANTS_TBL));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all menu items in a space
    getMenuItems: async (spaceId) => {
      const snapshot = await getDocs(collection(db, SPACES_TBL, spaceId, MENUEITEMS_TBL));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get details of a specific space
    getSpaceDetails: async (spaceId) => {
      const docSnap = await getDoc(doc(db, SPACES_TBL, spaceId));
      return docSnap.exists() ? docSnap.data() : null;
    },
    getSpaceById: async (spaceId) => {
      const docSnap = await getDoc(doc(db, SPACES_TBL, spaceId));
      if (!docSnap.exists()) return null;

      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
      };
    },
    getFavouriteMenuItemsByAdmin: async (adminId) => {
      const adminSpaces = await api.order.getSpacesByAdmin(adminId);
      console.log(adminSpaces)
      // Filter spaces where isFavourite is true
      const favouriteSpaces = adminSpaces.filter(space => space.isFavourite === true);
      console.log(favouriteSpaces);
      const favouriteMenuItems = [];

      for (const space of favouriteSpaces) {
        const menuItems = await api.space.getMenuItems(space.id);

        // Optionally, filter menu items too if needed
        // const filteredItems = menuItems.filter(item => item.isFavourite === true);


        favouriteMenuItems.push({
          id: space.id,
          name: space.spaceName || space.name || "Unnamed Menu", // fallback if no name
          items: menuItems.map(item => ({
            name: item.name,
            price: item.price,
          })),
        });
      }

      console.log(favouriteMenuItems);
      return favouriteMenuItems;

    }


  },

  participant: {
    // ✅ Submit or update a participant's part in the shared space order
    submitOrder: async (spaceId, participantId, items) => {
      const spaceRef = doc(db, SPACES_TBL, spaceId);
      const docSnap = await getDoc(spaceRef);
      if (!docSnap.exists()) return;

      const data = docSnap.data();
      const existingOrders = data.orders || [];

      for (const newItem of items) {
        const { itemId, quantity } = newItem;

        let itemOrder = existingOrders.find(order => order.itemId === itemId);
        if (!itemOrder) {
          // Add new item entry
          existingOrders.push({
            itemId,
            involved: [{ participantId, quantity }],
          });
        } else {
          // Check if participant already added
          const existing = itemOrder.involved.find(i => i.participantId === participantId);
          if (existing) {
            existing.quantity = quantity; // Overwrite quantity
          } else {
            itemOrder.involved.push({ participantId, quantity });
          }
        }
      }

      await updateDoc(spaceRef, { orders: existingOrders });
    },

    // ✅ Get only this participant's orders from the space's centralized order list
    getMyOrder: async (spaceId, participantId) => {
      const spaceRef = doc(db, 'spaces', spaceId);
      const docSnap = await getDoc(spaceRef);
      if (!docSnap.exists()) return null;

      const allOrders = docSnap.data().orders || [];

      // Filter to get only this participant’s involvement
      const myItems = allOrders
        .map(order => {
          const match = order.involved.find(i => i.participantId === participantId);
          if (match) {
            return {
              itemId: order.itemId,
              quantity: match.quantity,
            };
          }
          return null;
        })
        .filter(Boolean);

      return myItems;
    },

    pushParticipantOrder: async (spaceId, participantId, selectedItems) => {
      const ref = doc(db, SPACES_TBL, spaceId, PARTICIPANTS_TBL, participantId);
      if (!Array.isArray(selectedItems)) {
        selectedItems = []; // ✅ fallback to valid value
      }
      await setDoc(ref, {
        selectedItems,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }

  },

  order: {
    // Get all orders in a space (for admin or participants)
    // getAllOrders: async (spaceId) => {
    //   const snapshot = await getDocs(collection(db, SPACES_TBL, spaceId, 'orders'));
    //   return snapshot.docs.map(doc => ({ participantId: doc.id, ...doc.data() }));
    // },
    getSpacesByAdmin: async (adminId) => {
      const querySnapshot = await getDocs(
        query(collection(db, SPACES_TBL), where("adminId", "==", adminId))
      );

      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    getAllOrders: async (adminId) => {
      const spaces = await api.order.getSpacesByAdmin(adminId);
      const result = [];

      for (const space of spaces) {
        const orders = space.orders || [];
        result.push({
          spaceId: space.id,
          createdAt: space.createdAt,
          spaceName: space.name,
          orders: orders
        });
      }

      return result;
    },

    getFavouritesOrders: async (adminId) => {
      const orders = await api.order.getAllOrders(adminId);
      console.log(orders);
      return orders.filter(o => o.isFavourite);
    },

  },

  utils: {
    // Delete a space (admin use only — optional)
    deleteSpace: async (spaceId) => {
      await deleteDoc(doc(db, 'spaces', spaceId));
    },

    // Update space name (optional)
    updateSpaceName: async (spaceId, newName) => {
      await updateDoc(doc(db, 'spaces', spaceId), { name: newName });
    },
  },
};
