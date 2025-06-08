import React from 'react';

const FavouriteMenuSection = ({ favouriteMenus, selectedFavouriteMenu, setSelectedFavouriteMenu }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Select a Favourite Menu</span>
      </label>
      <select
        className="select select-bordered w-full"
        value={selectedFavouriteMenu}
        onChange={(e) => setSelectedFavouriteMenu(e.target.value)}
        required
      >
        <option value="" disabled>Select a menu</option>
        {favouriteMenus.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.name}
          </option>
        ))}
      </select>

      {selectedFavouriteMenu && (
        <div className="mt-4 p-4 bg-base-300 rounded-box">
          <h3 className="text-lg font-semibold mb-2">Selected Menu Details:</h3>
          {favouriteMenus.find(menu => menu.id === selectedFavouriteMenu)?.items.map((item, index) => (
            <p key={index} className="text-sm">{item.name} - ${item.price}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouriteMenuSection;