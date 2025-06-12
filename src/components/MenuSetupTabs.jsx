import React from 'react';

const MenuSetupTabs = ({ menuOption, setMenuOption }) => {
  return (
    <div role="tablist" className="tabs tabs-boxed mb-4">
      <a
        role="tab"
        className={`tab ${menuOption === 'createNew' ? 'tab-active' : ''}`}
        onClick={() => setMenuOption('createNew')}
      >
        Create New Menu
      </a>
      <a
        role="tab"
        className={`tab ${menuOption === 'useFavourite' ? 'tab-active' : ''}`}
        onClick={() => setMenuOption('useFavourite')}
      >
        Use Favourite Menu
      </a>
    </div>
  );
};

export default MenuSetupTabs;