import {
  doc,
  setDoc,
  serverTimestamp,
  collection,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
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
  fetchSignInMethodsForEmail

} from "firebase/auth";

import { auth, provider, db } from "../Firebase/config"; // Ensure `provider` is the Google provider

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
    createSpace: async (spaceId, adminId, spaceName, isClosed = false) => {
      await setDoc(doc(db, 'spaces', spaceId), {
        adminId,
        name: spaceName,
        createdAt: serverTimestamp(),
        isClosed: isClosed
      });
    },

    // Add a menu item to a space
    addMenuItem: async (spaceId, itemId, itemData) => {
      await setDoc(doc(db, 'spaces', spaceId, 'menuItems', itemId), itemData);
    },

    // Add a participant (with generated or custom ID)
    addParticipant: async (spaceId, participantId, name) => {
      await setDoc(doc(db, 'spaces', spaceId, 'participants', participantId), {
        name,
        joinedAt: serverTimestamp(),
      });
    },

    // Get all participants in a space
    getParticipants: async (spaceId) => {
      const snapshot = await getDocs(collection(db, 'spaces', spaceId, 'participants'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get all menu items in a space
    getMenuItems: async (spaceId) => {
      const snapshot = await getDocs(collection(db, 'spaces', spaceId, 'menuItems'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    // Get details of a specific space
    getSpaceDetails: async (spaceId) => {
      const docSnap = await getDoc(doc(db, 'spaces', spaceId));
      return docSnap.exists() ? docSnap.data() : null;
    },
  },

  participant: {
    // ✅ Submit or update a participant's part in the shared space order
    submitOrder: async (spaceId, participantId, items) => {
      const spaceRef = doc(db, 'spaces', spaceId);
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
    }
  },

  order: {
    // Get all orders in a space (for admin or participants)
    getAllOrders: async (spaceId) => {
      const snapshot = await getDocs(collection(db, 'spaces', spaceId, 'orders'));
      return snapshot.docs.map(doc => ({ participantId: doc.id, ...doc.data() }));
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
