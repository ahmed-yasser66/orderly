import React from 'react';
import FormInput from './FormInput';
import Button from './Button';

const CreateNewMenuSection = ({
  menuItems,
  handleAddMenuItem,
  handleRemoveMenuItem,
  handleMenuItemChange,
  saveAsFavourite,
  setSaveAsFavourite,
  favouriteMenuName,
  setFavouriteMenuName,
}) => {
  return (
    <>
      {menuItems.map((item) => (
        <div key={item.id} className="flex items-end space-x-4 mb-4">
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Item Name"
              placeholder="e.g., Burger"
              value={item.name}
              onChange={(e) => handleMenuItemChange(item.id, 'name', e.target.value)}
              required
            />
            <FormInput
              label="Description"
              placeholder="e.g., Beef patty with cheese"
              value={item.description}
              onChange={(e) => handleMenuItemChange(item.id, 'description', e.target.value)}
            />
            <FormInput
              label="Price"
              type="number"
              placeholder="e.g., 12.50"
              value={item.price}
              onChange={(e) => handleMenuItemChange(item.id, 'price', e.target.value)}
              required
            />
          </div>
          <Button variant="error" onClick={() => handleRemoveMenuItem(item.id)} className="btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </Button>
        </div>
      ))}
      <Button variant="secondary" onClick={handleAddMenuItem} className="mb-6">
        Add Menu Item
      </Button>

      <div className="form-control mt-4">
        <label className="label cursor-pointer justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={saveAsFavourite}
            onChange={(e) => setSaveAsFavourite(e.target.checked)}
          />
          <span className="label-text ml-2">Save this menu as a favourite</span>
        </label>
      </div>

      {saveAsFavourite && (
        <FormInput
          label="Favourite Menu Name"
          placeholder="e.g., My Standard Lunch Menu"
          value={favouriteMenuName}
          onChange={(e) => setFavouriteMenuName(e.target.value)}
          required
        />
      )}
    </>
  );
};

export default CreateNewMenuSection;