// src/pages/CreateSpacePage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFavouriteMenus,
  addFavouriteMenu,
  saveSpaceData,
  fetchFavouriteMenus,
} from "../features/slices/menuSlice";

// Component Imports
import SpaceDetailsForm from "../components/SpaceDetailsForm";
import MenuSetupTabs from "../components/MenuSetupTabs";
import CreateNewMenuSection from "../components/CreateNewMenuSection";
import FavouriteMenuSection from "../components/FavouriteMenuSection";
import FormActionButtons from "../components/FormActionButtons";
import { createNewSpace } from "../features/slices/spaceReducer";
import {
  addSpaceToAdmin,
  setCurrentSpace,
} from "../features/slices/adminReducer";
import { useNavigate } from "react-router";
import { api } from "../Firebase/api_util";

/**
 * CreateSpacePage component handles the creation of a new ordering space.
 * It manages form states for space details and menu setup, integrates with Redux
 * for managing favourite menus and saving space data.
 */
const CreateSpacePage = () => {
  // --- State for Space Details Form ---
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  // --- State for Menu Setup Section ---
  // Controls which menu setup tab is active: 'createNew' or 'useFavourite'
  const [menuOption, setMenuOption] = useState("createNew");
  // Manages individual menu items when creating a new menu
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "", description: "", price: "" },
  ]);
  // Controls whether the newly created menu should be saved as a favourite
  const [saveAsFavourite, setSaveAsFavourite] = useState(false);
  // Stores the name for a new favourite menu
  const [favouriteMenuName, setFavouriteMenuName] = useState("");
  // Stores the ID of the selected favourite menu when using an existing one
  const [selectedFavouriteMenu, setSelectedFavouriteMenu] = useState("");

  // --- Redux Integration ---
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const spaceList = useSelector((state) => state.space.spaces);
  const navigate = useNavigate();

  // Selects the favourite menus from the Redux store
  const favouriteMenus = useSelector((state) => state.menu.favouriteMenus);
  console.log(favouriteMenus);
  console.log("select menu => " + selectedFavouriteMenu);

  /**
   * useEffect hook to simulate fetching favourite menus on component mount.
   * In a real application, this would be replaced with an asynchronous API call
   * to retrieve favourite menus from a backend database.
   */
  useEffect(() => {
    // Dummy data for demonstration purposes.
    // const dummyMenus = [
    //   {
    //     id: "1",
    //     name: "Deli Favourites",
    //     items: [{ name: "Sandwich", price: "8.50" }],
    //   },
    //   {
    //     id: "2",
    //     name: "Pizza Night Menu",
    //     items: [{ name: "Pepperoni Pizza", price: "15.00" }],
    //   },
    // ];
    // // Dispatch action to set favourite menus in Redux store
    // dispatch(setFavouriteMenus(dummyMenus));

    console.log("Using existing favourite menu");
    dispatch(fetchFavouriteMenus(admin.id)); // Fetch favourite menus if using existing ones

    // dispatch();
  }, [dispatch, admin.id]); // Dependency array ensures this runs only once on mount

  // --- Handlers for Menu Item Management ---

  /**
   * Adds a new empty menu item to the `menuItems` state.
   * Uses `Date.now()` for a unique ID for each new item.
   */
  const handleAddMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { id: Date.now(), name: "", description: "", price: "" },
    ]);
  };

  /**
   * Removes a menu item from the `menuItems` state based on its ID.
   * @param {number} id - The unique ID of the menu item to remove.
   */
  const handleRemoveMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  /**
   * Updates a specific field of a menu item in the `menuItems` state.
   * @param {number} id - The unique ID of the menu item to update.
   * @param {string} field - The field name to update (e.g., 'name', 'description', 'price').
   * @param {string} value - The new value for the specified field.
   */
  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // --- Form Submission Handler ---

  /**
   * Handles the form submission. Prevents default form submission,
   * constructs the form data, dispatches it to Redux for saving,
   * and conditionally saves the new menu as a favourite if selected.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Consolidate all form data into a single object
    const formData = {
      spaceDetails: {
        spaceName,
        description,
        restaurantName,
      },
      menuSetup: {
        menuOption,
        // Conditionally include menu items and favourite save options if 'createNew'
        ...(menuOption === "createNew" && {
          menuItems,
          saveAsFavourite,
          ...(saveAsFavourite && { favouriteMenuName }), // Only include favouriteMenuName if saveAsFavourite is true
        }),
        // Conditionally include selected favourite menu if 'useFavourite'
        ...(menuOption === "useFavourite" && {
          selectedFavouriteMenu,
        }),
      },
    };

    // Dispatch the consolidated form data to Redux for saving.
    // This would typically trigger an async thunk to an API.
    console.log(formData);
    // dispatch(saveSpaceData(formData));
    // formData.spaceDetails.adminId = admin.id; // Add admin ID to space details
    // dispatch(createNewSpace(formData.spaceDetails));
    // const lastSpace = spaceList.at(-1);
    // dispatch(setCurrentSpace(lastSpace));

    // Step 1: Extract spaceDetails and menuSetup from formData
    const { spaceDetails, menuSetup } = formData;

    // Step 2: Add admin ID to spaceDetails
    spaceDetails.adminId = admin.id;
    spaceDetails.isFavourite = menuSetup.saveAsFavourite || false; // add isFavourite flag

    // Step 3: Dispatch to create the new space and get back the space object
    const result = await dispatch(createNewSpace(spaceDetails)).unwrap(); // This gives you the actual returned space object
    const spaceId = result.id;

    // Step 4: Set current space if needed
    dispatch(setCurrentSpace(result));

    // Step 5: If menuOption is 'createNew', add menu items
    const itemsCollection =
      menuSetup.menuOption === "createNew"
        ? menuSetup.menuItems
        : favouriteMenus;
    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    // console.log(itemsCollection);
    // console.log(itemsCollection[itemsCollection.length - 1]);
    let selectedMeun = itemsCollection.find((item) => {
      // console.log("inside find");
      // console.log(item.id);
      // console.log(selectedFavouriteMenu);
      return item.id === selectedFavouriteMenu;
    }); // Check if any item has an empty name{
    console.log(selectedMeun);
    for (let idx = 0; idx < selectedMeun.items.length; idx++) {
      const item = selectedMeun.items[idx];
      const itemId = `${spaceId}-${idx}`; // or use item.id if available
      const itemData = {
        ...item,
      };
      await api.space.addMenuItem(spaceId, itemId, itemData); // Save under /spaces/{spaceId}/menuItems/{itemId}
    }
    // dispatch(addSpaceToAdmin(lastSpace));

    // If a new menu was created and marked as favourite, add it to Redux state
    // if (menuOption === "createNew" && saveAsFavourite) {
    //   dispatch(
    //     addFavouriteMenu({
    //       id: Date.now().toString(),
    //       name: favouriteMenuName,
    //       items: menuItems,
    //     })
    //   );
    // }
    navigate("/home");
  };

  /**
   * Handles the form cancellation. Resets all form fields to their initial empty states.
   * In a production application, this might also involve navigating the user away
   * from the form page.
   */
  const handleCancel = () => {
    // Reset all state variables to their initial values
    setSpaceName("");
    setDescription("");
    setRestaurantName("");
    setMenuOption("createNew");
    setMenuItems([{ id: 1, name: "", description: "", price: "" }]);
    setSaveAsFavourite(false);
    setFavouriteMenuName("");
    setSelectedFavouriteMenu("");
    console.log("Form cancelled and reset");
    // Example of navigation (requires react-router-dom or similar):
    navigate("/home");
  };

  return (
    <div className="bg-base-100 text-base-content">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Create New Ordering Space
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Space Details Form Section */}
        <SpaceDetailsForm
          spaceName={spaceName}
          setSpaceName={setSpaceName}
          description={description}
          setDescription={setDescription}
          restaurantName={restaurantName}
          setRestaurantName={setRestaurantName}
          handleCancel={handleCancel}
        />

        {/* Menu Setup Section */}
        <div className="card bg-base-200 shadow-sm p-6 rounded-box">
          <div className="card-body p-0">
            <h2 className="card-title text-2xl mb-4">Menu Setup</h2>
            {/* Menu Setup Tabs for switching between 'Create New' and 'Use Favourite' */}
            <MenuSetupTabs
              menuOption={menuOption}
              setMenuOption={setMenuOption}
            />

            {/* Conditionally render CreateNewMenuSection based on menuOption */}
            {menuOption === "createNew" && (
              <CreateNewMenuSection
                menuItems={menuItems}
                handleAddMenuItem={handleAddMenuItem}
                handleRemoveMenuItem={handleRemoveMenuItem}
                handleMenuItemChange={handleMenuItemChange}
                saveAsFavourite={saveAsFavourite}
                setSaveAsFavourite={setSaveAsFavourite}
                favouriteMenuName={favouriteMenuName}
                setFavouriteMenuName={setFavouriteMenuName}
              />
            )}

            {/* Conditionally render FavouriteMenuSection based on menuOption */}
            {menuOption === "useFavourite" && (
              <FavouriteMenuSection
                favouriteMenus={favouriteMenus}
                selectedFavouriteMenu={selectedFavouriteMenu}
                setSelectedFavouriteMenu={setSelectedFavouriteMenu}
              />
            )}
          </div>
        </div>

        {/* Form Action Buttons (Submit and Cancel) */}
        {/* <FormActionButtons onCancel={handleCancel} /> */}
      </form>
    </div>
  );
};

export default CreateSpacePage;
