import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  setFavouriteMenus,
  addFavouriteMenu,
  saveSpaceData,
  fetchFavouriteMenus,
} from "../features/slices/menuSlice";


import SpaceDetailsForm from "../components/SpaceDetailsForm";
import MenuSetupTabs from "../components/MenuSetupTabs";
import CreateNewMenuSection from "../components/CreateNewMenuSection";
import FavouriteMenuSection from "../components/FavouriteMenuSection";
import FormActionButtons from "../components/FormActionButtons";
import { createNewSpace } from "../features/slices/spaceReducer";
import { setCurrentSpace } from "../features/slices/adminReducer";
import { api } from "../Firebase/api_util";

const CreateSpacePage = () => {
  const [spaceName, setSpaceName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  const [menuOption, setMenuOption] = useState("createNew");
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "", description: "", price: "" },
  ]);
  const [saveAsFavourite, setSaveAsFavourite] = useState(false);
  const [favouriteMenuName, setFavouriteMenuName] = useState("");
  const [selectedFavouriteMenu, setSelectedFavouriteMenu] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin);
  const favouriteMenus = useSelector((state) => state.menu.favouriteMenus);
  // console.log(favouriteMenus);
  // console.log("select menu => " + selectedFavouriteMenu);

  useEffect(() => {
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
    // dispatch(setFavouriteMenus(dummyMenus));
    dispatch(fetchFavouriteMenus(admin.id)); // Fetch favourite menus for the admin
  }, [dispatch, admin.id]);

  const handleAddMenuItem = () => {
    setMenuItems([
      ...menuItems,
      { id: Date.now(), name: "", description: "", price: "" },
    ]);
  };

  const handleRemoveMenuItem = (id) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      spaceDetails: {
        spaceName,
        description,
        restaurantName,
      },
      menuSetup: {
        menuOption,
        ...(menuOption === "createNew" && {
          menuItems,
          saveAsFavourite,
          ...(saveAsFavourite && { favouriteMenuName }),
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
        : favouriteMenus.find((item) => item.id === selectedFavouriteMenu)
            .items;

    // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    // console.log(itemsCollection);
    // console.log(itemsCollection[itemsCollection.length - 1]);
    // let selectedMeun = itemsCollection.find((item) => {
    //   console.log("inside find");
    //   console.log(item.id);
    //   console.log(selectedFavouriteMenu);
    //   return item.id === selectedFavouriteMenu;
    // }); // Check if any item has an empty name{
    // console.log(selectedMeun);
    for (let idx = 0; idx < itemsCollection.length; idx++) {
      const item = itemsCollection[idx];
      const itemId = `${spaceId}-${idx}`; // or use item.id if available
      const itemData = {
        ...item,
      };
      await api.space.addMenuItem(spaceId, itemId, itemData); // Save under /spaces/{spaceId}/menuItems/{itemId}
    }
    navigate("/checkout");
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
    // navigate("/home");
    // dispatch(saveSpaceData(formData));

    // if (menuOption === "createNew" && saveAsFavourite) {
    //   dispatch(
    //     addFavouriteMenu({
    //       id: Date.now().toString(),
    //       name: favouriteMenuName,
    //       items: menuItems,
    //     })
    //   );
    // }
  };

  const handleCancel = () => {
    setSpaceName("");
    setDescription("");
    setRestaurantName("");
    setMenuOption("createNew");
    setMenuItems([{ id: 1, name: "", description: "", price: "" }]);
    setSaveAsFavourite(false);
    setFavouriteMenuName("");
    setSelectedFavouriteMenu("");
    console.log("Form cancelled and reset");
    navigate("/home");
  };

  return (
    <div className="bg-base-100 text-base-content my-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Create New Ordering Space
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        <SpaceDetailsForm
          spaceName={spaceName}
          setSpaceName={setSpaceName}
          description={description}
          setDescription={setDescription}
          restaurantName={restaurantName}
          setRestaurantName={setRestaurantName}
        />

        <div className="card bg-base-200 shadow-sm p-6 rounded-box">
          <div className="card-body p-0">
            <h2 className="card-title text-2xl mb-4">Menu Setup</h2>
            <MenuSetupTabs
              menuOption={menuOption}
              setMenuOption={setMenuOption}
            />

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

            {menuOption === "useFavourite" && (
              <FavouriteMenuSection
                favouriteMenus={favouriteMenus}
                selectedFavouriteMenu={selectedFavouriteMenu}
                setSelectedFavouriteMenu={setSelectedFavouriteMenu}
              />
            )}
          <FormActionButtons onCancel={handleCancel} />
          </div>
        </div>

        {/* Form Action Buttons (Submit and Cancel) */}
        {/* <FormActionButtons onCancel={handleCancel} /> */}
      </form>
    </div>
  );
};

export default CreateSpacePage;
