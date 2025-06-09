import React, { useState } from 'react';
import FormInput from './FormInput';
import Avatar from './Avatar';
import Button from './Button';

const UsernamePopup = ({ isOpen, onClose, onSubmit }) => {
  const [username, setUsername] = useState('');

  if (!isOpen) return null;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username);
      setUsername(''); // Clear input after submission
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="card w-96 bg-base-200 shadow-xl p-8 relative">
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-6 text-primary text-center">Enter Your Name</h2>
        <div className="flex justify-center mb-6">
          <Avatar title={username || '?'} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Your Name"
            type="text"
            placeholder="e.g., John Doe"
            value={username}
            onChange={handleUsernameChange}
            required={true}
          />
          <Button type="submit" className="btn-primary w-full">
            Save Name
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UsernamePopup;