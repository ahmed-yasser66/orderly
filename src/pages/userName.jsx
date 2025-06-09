import React, { useState } from 'react';
import Container from '../components/Container';
import FormInput from '../components/FormInput';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import Layout from '../components/Layout';

const CreateUserPage = () => {
  const [username, setUsername] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the username to a backend or state management
    console.log('Username submitted:', username);
    alert(`Username "${username}" created!`);
  };

  return (
    <Layout>
      <Container>
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
          <h1 className="text-4xl font-bold mb-8 text-primary">Create Your Profile</h1>
          <div className="card w-96 bg-base-200 shadow-xl p-8">
            <div className="flex justify-center mb-6">
              <Avatar title={username || 'Guest'} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                label="Username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={handleUsernameChange}
                required={true}
              />
              <Button type="submit" className="btn-primary w-full">
                Create Profile
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default CreateUserPage;