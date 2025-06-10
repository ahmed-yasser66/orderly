import React from "react";
import FormInput from "./FormInput";
import FormActionButtons from "./FormActionButtons";

const SpaceDetailsForm = ({
  spaceName,
  setSpaceName,
  description,
  setDescription,
  restaurantName,
  setRestaurantName,
}) => {
  return (
    <div className="card bg-base-200 shadow-sm p-6 rounded-box">
      <div className="card-body p-0">
        <div className="head">
          <h2 className="card-title text-2xl mb-4">Space Details</h2>
        </div>
        <FormInput
          label="Space Name"
          placeholder="e.g., Team Lunch Order"
          value={spaceName}
          onChange={(e) => setSpaceName(e.target.value)}
          required
        />
        <FormInput
          label="Description"
          placeholder="e.g., Weekly team lunch for software development department"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          isTextArea
        />
        <FormInput
          label="Restaurant Name"
          placeholder="e.g., Pizza Palace"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default SpaceDetailsForm;
