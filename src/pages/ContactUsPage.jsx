import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-base-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl w-full space-y-8 bg-base-200 p-10 rounded-xl shadow-lg"
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-center text-4xl font-extrabold text-primary"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-2 text-center text-lg text-base-content"
          >
            We'd love to hear from you! Please fill out the form below or use our alternative contact methods.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="card bg-base-100 shadow-xl p-6"
          >
            <h3 className="text-2xl font-bold text-secondary mb-4">Send us a message</h3>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  <span className="label-text text-base-content">Name</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="input input-bordered w-full"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="label">
                  <span className="label-text text-base-content">Email address</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input input-bordered w-full"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="label">
                  <span className="label-text text-base-content">Subject</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="input input-bordered w-full"
                  placeholder="Subject of your inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="label">
                  <span className="label-text text-base-content">Message</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="textarea textarea-bordered w-full"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary w-full py-3 text-lg font-semibold"
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="space-y-6"
          >
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-secondary mb-4">Other Ways to Reach Us</h3>
              <p className="text-base-content mb-2">
                <strong className="font-semibold">Email:</strong> <a href="mailto:contact@orderly.com" className="link link-hover text-accent">contact@orderly.com</a>
              </p>
              <p className="text-base-content">
                <strong className="font-semibold">Phone:</strong> +2 123 456 7890
              </p>
            </div>

            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-2xl font-bold text-secondary mb-4">Meet Team 4A</h3>
              <p className="text-base-content mb-4">
                Our dedicated team is here to assist you. Feel free to reach out to any of our members:
              </p>
              <ul className="list-disc list-inside text-base-content space-y-2">
                <li>Ahmed Gamal</li>
                <li>Ahmed Yasser</li>
                <li>Ahmed Bakr</li>
                <li>Ahmed Adel</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPage;