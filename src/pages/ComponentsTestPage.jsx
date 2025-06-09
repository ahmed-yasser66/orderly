import React, { useState, useEffect } from 'react';
import { handleSuccess, handleError } from '../components/alerts.jsx';
import Auth from '../components/Auth.jsx';
import Avatar from '../components/Avatar.jsx';
import Button from '../components/Button.jsx';
import CheckItem from '../components/CheckItem.jsx';
import Container from '../components/Container.jsx';
import Counter from '../components/Counter.jsx';
import CreateNewMenuSection from '../components/CreateNewMenuSection.jsx';
import FavouriteMenuSection from '../components/FavouriteMenuSection.jsx';
import FormActionButtons from '../components/FormActionButtons.jsx';
import FormInput from '../components/FormInput.jsx';
import Home from '../components/Home.jsx';
import Layout from '../components/Layout.jsx';
import LoginForm from '../components/LoginForm.jsx';
import MenuSetupTabs from '../components/MenuSetupTabs.jsx';
import Navbar from '../components/Navbar.jsx';
import Pagination from '../components/Pagination.jsx';
import RecentOrder from '../components/RecentOrder.jsx';
import SignUp from '../components/SignUp.jsx';
import SpaceDetailsForm from '../components/SpaceDetailsForm.jsx';
import Table from '../components/Table.jsx';
import TextField from '../components/TextField.jsx';
import UsernamePopup from '../components/userNamePopup.jsx'; // Renamed import

const ComponentsTestPage = () => {
  const [isUsernamePopupOpen, setIsUsernamePopupOpen] = useState(false);
  const [currentUsername, setCurrentUsername] = useState('');

  useEffect(() => {
    // Simulate checking for a stored username
    const storedUsername = localStorage.getItem('testUsername');
    if (storedUsername) {
      setCurrentUsername(storedUsername);
    }
  }, []);

  const handleUsernameSubmit = (name) => {
    setCurrentUsername(name);
    localStorage.setItem('testUsername', name);
    setIsUsernamePopupOpen(false);
    handleSuccess(`Username set to: ${name}`);
  };

  const handleClosePopup = () => {
    setIsUsernamePopupOpen(false);
    handleError({ message: "Username popup closed without saving." });
  };

  return (
    <Container>
      <h1>Reusable Components Test Page</h1>

      <h2>Alerts</h2>
      <Button onClick={() => handleSuccess()}>Show Success Alert</Button>
      <Button onClick={() => handleError({ message: "This is an error alert!" })}>Show Error Alert</Button>

      <h2>Auth</h2>
      {/* Auth component might require context or specific props */}
      {/* <Auth /> */}

      <h2>Avatar</h2>
      <Avatar src="https://via.placeholder.com/50" alt="User Avatar" />

      <h2>User Name Popup</h2>
      <p>Current Username: {currentUsername || 'Not Set'}</p>
      <Button onClick={() => setIsUsernamePopupOpen(true)}>Open Username Popup</Button>
      <UsernamePopup
        isOpen={isUsernamePopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleUsernameSubmit}
      />

    </Container>
  );
};

export default ComponentsTestPage;
