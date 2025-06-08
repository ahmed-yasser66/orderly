// src/pages/CreateSpacePage.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouriteMenus, addFavouriteMenu, saveSpaceData } from '../features/slices/menuSlice';

// Component Imports
import SpaceDetailsForm from '../components/SpaceDetailsForm';
import MenuSetupTabs from '../components/MenuSetupTabs';
import CreateNewMenuSection from '../components/CreateNewMenuSection';
import FavouriteMenuSection from '../components/FavouriteMenuSection';
import FormActionButtons from '../components/FormActionButtons';

/**
 * CreateSpacePage component handles the creation of a new ordering space.
 * It manages form states for space details and menu setup, integrates with Redux
 * for managing favourite menus and saving space data.
 */
const CreateSpacePage = () => {
  // --- State for Space Details Form ---
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  // --- State for Menu Setup Section ---
  // Controls which menu setup tab is active: 'createNew' or 'useFavourite'
  const [menuOption, setMenuOption] = useState('createNew');
  // Manages individual menu items when creating a new menu
  const [menuItems, setMenuItems] = useState([{ id: 1, name: '', description: '', price: '' }]);
  // Controls whether the newly created menu should be saved as a favourite
  const [saveAsFavourite, setSaveAsFavourite] = useState(false);
  // Stores the name for a new favourite menu
  const [favouriteMenuName, setFavouriteMenuName] = useState('');
  // Stores the ID of the selected favourite menu when using an existing one
  const [selectedFavouriteMenu, setSelectedFavouriteMenu] = useState('');

  // --- Redux Integration ---
  const dispatch = useDispatch();
  // Selects the favourite menus from the Redux store
  const favouriteMenus = useSelector((state) => state.menu.favouriteMenus);

  /**
   * useEffect hook to simulate fetching favourite menus on component mount.
   * In a real application, this would be replaced with an asynchronous API call
   * to retrieve favourite menus from a backend database.
   */
  useEffect(() => {
    // Dummy data for demonstration purposes.
    const dummyMenus = [
      { id: '1', name: 'Deli Favourites', items: [{ name: 'Sandwich', price: '8.50' }] },
      { id: '2', name: 'Pizza Night Menu', items: [{ name: 'Pepperoni Pizza', price: '15.00' }] },
    ];
    // Dispatch action to set favourite menus in Redux store
    dispatch(setFavouriteMenus(dummyMenus));
  }, [dispatch]); // Dependency array ensures this runs only once on mount

  // --- Handlers for Menu Item Management ---

  /**
   * Adds a new empty menu item to the `menuItems` state.
   * Uses `Date.now()` for a unique ID for each new item.
   */
  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { id: Date.now(), name: '', description: '', price: '' }]);
  };

  /**
   * Removes a menu item from the `menuItems` state based on its ID.
   * @param {number} id - The unique ID of the menu item to remove.
   */
  const handleRemoveMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  /**
   * Updates a specific field of a menu item in the `menuItems` state.
   * @param {number} id - The unique ID of the menu item to update.
   * @param {string} field - The field name to update (e.g., 'name', 'description', 'price').
   * @param {string} value - The new value for the specified field.
   */
  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // --- Form Submission Handler ---

  /**
   * Handles the form submission. Prevents default form submission,
   * constructs the form data, dispatches it to Redux for saving,
   * and conditionally saves the new menu as a favourite if selected.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
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
        ...(menuOption === 'createNew' && {
          menuItems,
          saveAsFavourite,
          ...(saveAsFavourite && { favouriteMenuName }), // Only include favouriteMenuName if saveAsFavourite is true
        }),
        // Conditionally include selected favourite menu if 'useFavourite'
        ...(menuOption === 'useFavourite' && {
          selectedFavouriteMenu,
        }),
      },
    };

    // Dispatch the consolidated form data to Redux for saving.
    // This would typically trigger an async thunk to an API.
    dispatch(saveSpaceData(formData));

    // If a new menu was created and marked as favourite, add it to Redux state
    if (menuOption === 'createNew' && saveAsFavourite) {
      dispatch(addFavouriteMenu({ id: Date.now().toString(), name: favouriteMenuName, items: menuItems }));
    }
  };

  /**
   * Handles the form cancellation. Resets all form fields to their initial empty states.
   * In a production application, this might also involve navigating the user away
   * from the form page.
   */
  const handleCancel = () => {
    // Reset all state variables to their initial values
    setSpaceName('');
    setDescription('');
    setRestaurantName('');
    setMenuOption('createNew');
    setMenuItems([{ id: 1, name: '', description: '', price: '' }]);
    setSaveAsFavourite(false);
    setFavouriteMenuName('');
    setSelectedFavouriteMenu('');
    console.log('Form cancelled and reset');
    // Example of navigation (requires react-router-dom or similar):
    // navigate('/dashboard');
  };

  return (
    <div className="bg-base-100 text-base-content">
      <h1 className="text-4xl font-bold mb-8 text-center">Create New Ordering Space</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Space Details Form Section */}
        <SpaceDetailsForm
          spaceName={spaceName}
          setSpaceName={setSpaceName}
          description={description}
          setDescription={setDescription}
          restaurantName={restaurantName}
          setRestaurantName={setRestaurantName}
        />

        {/* Menu Setup Section */}
        <div className="card bg-base-200 shadow-sm p-6 rounded-box">
          <div className="card-body p-0">
            <h2 className="card-title text-2xl mb-4">Menu Setup</h2>
            {/* Menu Setup Tabs for switching between 'Create New' and 'Use Favourite' */}
            <MenuSetupTabs menuOption={menuOption} setMenuOption={setMenuOption} />

            {/* Conditionally render CreateNewMenuSection based on menuOption */}
            {menuOption === 'createNew' && (
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
            {menuOption === 'useFavourite' && (
              <FavouriteMenuSection
                favouriteMenus={favouriteMenus}
                selectedFavouriteMenu={selectedFavouriteMenu}
                setSelectedFavouriteMenu={setSelectedFavouriteMenu}
              />
            )}
          </div>
        </div>

        {/* Form Action Buttons (Submit and Cancel) */}
        <FormActionButtons onCancel={handleCancel} />
      </form>
    </div>
  );
};

export default CreateSpacePage;