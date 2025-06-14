import React from "react";
import Button from "./Button";

const FormActionButtons = ({ onCancel }) => {
  return (
    <div className="flex justify-start space-x-4 mt-6">
      <Button type="submit" variant="primary">
        Create Space
      </Button>
      <Button variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default FormActionButtons;
