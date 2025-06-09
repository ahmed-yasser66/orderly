import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFavouriteMenus, addFavouriteMenu, saveSpaceData } from '../features/slices/menuSlice';

import SpaceDetailsForm from '../components/SpaceDetailsForm';
import MenuSetupTabs from '../components/MenuSetupTabs';
import CreateNewMenuSection from '../components/CreateNewMenuSection';
import FavouriteMenuSection from '../components/FavouriteMenuSection';
import FormActionButtons from '../components/FormActionButtons';

const CreateSpacePage = () => {
  const [spaceName, setSpaceName] = useState('');
  const [description, setDescription] = useState('');
  const [restaurantName, setRestaurantName] = useState('');

  const [menuOption, setMenuOption] = useState('createNew');
  const [menuItems, setMenuItems] = useState([{ id: 1, name: '', description: '', price: '' }]);
  const [saveAsFavourite, setSaveAsFavourite] = useState(false);
  const [favouriteMenuName, setFavouriteMenuName] = useState('');
  const [selectedFavouriteMenu, setSelectedFavouriteMenu] = useState('');

  const dispatch = useDispatch();
  const favouriteMenus = useSelector((state) => state.menu.favouriteMenus);

  useEffect(() => {
    const dummyMenus = [
      { id: '1', name: 'Deli Favourites', items: [{ name: 'Sandwich', price: '8.50' }] },
      { id: '2', name: 'Pizza Night Menu', items: [{ name: 'Pepperoni Pizza', price: '15.00' }] },
    ];
    dispatch(setFavouriteMenus(dummyMenus));
  }, [dispatch]);


  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { id: Date.now(), name: '', description: '', price: '' }]);
  };

  const handleRemoveMenuItem = (id) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const handleMenuItemChange = (id, field, value) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      spaceDetails: {
        spaceName,
        description,
        restaurantName,
      },
      menuSetup: {
        menuOption,
        ...(menuOption === 'createNew' && {
          menuItems,
          saveAsFavourite,
          ...(saveAsFavourite && { favouriteMenuName }),
        }),
        ...(menuOption === 'useFavourite' && {
          selectedFavouriteMenu,
        }),
      },
    };

    dispatch(saveSpaceData(formData));

    if (menuOption === 'createNew' && saveAsFavourite) {
      dispatch(addFavouriteMenu({ id: Date.now().toString(), name: favouriteMenuName, items: menuItems }));
    }
  };

  const handleCancel = () => {
    setSpaceName('');
    setDescription('');
    setRestaurantName('');
    setMenuOption('createNew');
    setMenuItems([{ id: 1, name: '', description: '', price: '' }]);
    setSaveAsFavourite(false);
    setFavouriteMenuName('');
    setSelectedFavouriteMenu('');
    console.log('Form cancelled and reset');
  };

  return (
    <div className="bg-base-100 text-base-content">
      <h1 className="text-4xl font-bold mb-8 text-center">Create New Ordering Space</h1>

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
            <MenuSetupTabs menuOption={menuOption} setMenuOption={setMenuOption} />

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

            {menuOption === 'useFavourite' && (
              <FavouriteMenuSection
                favouriteMenus={favouriteMenus}
                selectedFavouriteMenu={selectedFavouriteMenu}
                setSelectedFavouriteMenu={setSelectedFavouriteMenu}
              />
            )}
          </div>
        </div>

        <FormActionButtons onCancel={handleCancel} />
      </form>
    </div>
  );
};

export default CreateSpacePage;