import React from "react";
import Button from "./Button";

const FormActionButtons = ({ onCancel }) => {
  return (
    <div className="flex justify-end space-x-4 mt-8">
      <Button type="submit" variant="primary">
        Create Space
      </Button>
      <Button variant="neutral" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default FormActionButtons;
