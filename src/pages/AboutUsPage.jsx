import React from 'react';
import Container from '../components/Container';
import { motion } from 'framer-motion';

// Helper for icons to keep the main component clean
const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const AboutUsPage = () => {
  const features = [
    { text: 'Effortless order creation for any group.' },
    { text: 'Real-time collaboration to see selections live.' },
    { text: 'Personalized selections for every participant.' },
    { text: 'A clear, consolidated overview of the entire order.' },
    { text: 'Simple finalization and status tracking.' },
    { text: 'An intuitive, user-friendly interface.' },
  ];

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Hero Section */}
        <motion.div
          className="hero min-h-96 bg-base-200 rounded-box mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hero-content text-center">
            <div className="max-w-md">
              <motion.h1
                className="text-5xl font-bold text-primary"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                About Orderly
              </motion.h1>
              <motion.p
                className="py-6 text-lg text-base-content"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Your ultimate solution for simplifying group orders, making collaboration effortless and enjoyable.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          className="card bg-base-100 shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="card-body p-0">
            <motion.h2
              className="text-3xl font-bold text-secondary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Our Mission
            </motion.h2>
            <motion.p
              className="text-base-content/80 mb-6 leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Orderly is your go-to application for simplifying group orders. Whether you're
              ordering food with friends, coordinating a team lunch, or managing a collective
              purchase, Orderly makes it easy to gather everyone's selections and finalize
              the order without the usual hassle. We aim to streamline the entire process,
              from initial selection to finalization, ensuring a smooth and stress-free experience
              for everyone involved.
            </motion.p>

            <div className="divider my-6"></div>

            <motion.h2
              className="text-3xl font-bold text-secondary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Key Features
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start space-x-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircleIcon />
                  </div>
                  <p className="text-base-content text-lg">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="divider my-6"></div>

            <motion.h2
              className="text-3xl font-bold text-secondary mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              How It Works
            </motion.h2>
            <ol className="list-decimal list-inside text-base-content space-y-4 text-lg">
              {['Create a New Space', 'Invite Participants', 'Add Your Items', 'Review the Collective Order', 'Finalize & Enjoy'].map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                >
                  <strong className="text-base-content">{step.split(':')[0]}:</strong> {step.split(':')[1] || ''}
                </motion.li>
              ))}
            </ol>

            <motion.p
              className="text-base-content/80 mt-10 text-center italic text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.8 }}
            >
              Orderly is designed to take the stress out of group ordering, so you can focus on what matters most – enjoying your meal with others.
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

export default AboutUsPage;