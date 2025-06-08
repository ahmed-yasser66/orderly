import React from 'react';
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

const ComponentsTestPage = () => {
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

      <h2>Button</h2>
      <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>

      <h2>CheckItem</h2>
      <CheckItem label="Check this item" checked={false} onChange={() => {}} />

      <h2>Container</h2>
      <Container>
        <p>Content inside a container.</p>
      </Container>

      <h2>Counter</h2>
      <Counter />

      <h2>CreateNewMenuSection</h2>
      {/* CreateNewMenuSection might require specific props/context */}
      {/* <CreateNewMenuSection /> */}

      <h2>FavouriteMenuSection</h2>
      {/* FavouriteMenuSection might require specific props/context */}
      {/* <FavouriteMenuSection /> */}

      <h2>FormActionButtons</h2>
      <FormActionButtons onCancel={() => alert('Cancel')} onSubmit={() => alert('Submit')} />

      <h2>FormInput</h2>
      <FormInput label="Text Input" type="text" placeholder="Enter text" />
      <FormInput label="Password Input" type="password" placeholder="Enter password" />

      <h2>Home</h2>
      {/* Home component might require context or specific props */}
      {/* <Home /> */}

      <h2>Layout</h2>
      {/* Layout component typically wraps other content */}
      {/* <Layout>
        <p>Content inside layout.</p>
      </Layout> */}

      <h2>LoginForm</h2>
      {/* LoginForm might require specific props/context */}
      {/* <LoginForm /> */}

      <h2>MenuSetupTabs</h2>
      {/* MenuSetupTabs might require specific props/context */}
      {/* <MenuSetupTabs /> */}

      <h2>Navbar</h2>
      {/* Navbar might require specific props/context */}
      {/* <Navbar /> */}

      <h2>Pagination</h2>
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />

      <h2>RecentOrder</h2>
      {/* RecentOrder might require specific props/context */}
      {/* <RecentOrder /> */}

      <h2>SignUp</h2>
      {/* SignUp might require specific props/context */}
      {/* <SignUp /> */}

      <h2>SpaceDetailsForm</h2>
      {/* SpaceDetailsForm might require specific props/context */}
      {/* <SpaceDetailsForm /> */}

      <h2>Table</h2>
      {/* Table component requires data and columns */}
      {/* <Table data={[]} columns={[]} /> */}

      <h2>TextField</h2>
      <TextField label="Text Field" placeholder="Enter text here" />

    </Container>
  );
};

export default ComponentsTestPage;