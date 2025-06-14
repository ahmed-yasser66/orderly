# Orderly

## Project Description

Orderly is a modern web application designed to streamline and manage collective orders, possibly within a shared space or group setting. It provides functionalities for users to create, manage, and finalize orders, track participants' selections, and view order details. The application aims to enhance collaboration and efficiency in group ordering scenarios.

## Features

- **User Authentication:** Secure sign-up and login functionalities.
- **Space Management:** Create and manage collaborative ordering spaces.
- **Menu Management:** Define and organize menu items for ordering.
- **Collective Ordering:** Facilitate group orders with individual selections.
- **Order Tracking:** Monitor the status and details of ongoing and finalized orders.
- **Participant Management:** View and manage participants within a space.
- **Responsive Design:** Visually appealing and user-friendly interface across various devices.

## Technologies Used

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A fast build tool for modern web projects.
- **Redux Toolkit:** For efficient state management.
- **Firebase:** Backend services for authentication, database, and more.
- **React Router DOM:** For declarative routing in React applications.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **DaisyUI:** A Tailwind CSS component library for pre-built UI components.
- **Framer Motion:** For animations and interactive components.
- **SweetAlert2:** For beautiful, responsive, customizable, accessible replacement for JavaScript's popup boxes.

## Installation

To get a local copy up and running, follow these simple steps.

### Prerequisites

- npm (Node Package Manager)
  ```bash
  npm install npm@latest -g
  ```

### Clone the repository

```bash
git clone https://github.com/your-username/orderly.git
cd orderly
```

### Install NPM packages

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Firebase configuration:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Usage

To run the project in development mode:

```bash
npm run dev
```

This will start the development server, and you can view the application in your browser, usually at `http://localhost:5173`.

To build the project for production:

```bash
npm run build
```

This will create a `dist` folder with the production-ready build.
