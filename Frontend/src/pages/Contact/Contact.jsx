import React from 'react';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { FaChevronDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-lg bg-white shadow-md">
      <button
        className="flex w-full items-center justify-between p-6 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-gray-800">{question}</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        {/* <i
          className={`fas ${
            isOpen ? "fa-chevron-up" : "fa-chevron-down"
          } text-indigo-600`}
        ></i> */}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQSection = () => {
  const faqs = [
    {
      question: 'How can I track my order?',
      answer:
        "You can track your order by logging into your account and viewing the order details. You'll receive tracking information via email once your order ships.",
    },
    {
      question: 'What is your return policy?',
      answer:
        'We accept returns within 30 days of purchase. Items must be in original condition with all tags attached. Please contact our support team to initiate a return.',
    },
    {
      question: 'Do you ship internationally?',
      answer:
        'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Please check our shipping information page for details.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'Our customer support team is available via phone, email, and live chat during business hours. You can find all contact options on this page.',
    },
  ];

  return (
    <>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </>
  );
};

const Contact = () => {
  return (
    <>
      <Navbar />
      {/* <!-- Hero Section --> */}
      <section class="bg-indigo-700 py-16 text-white">
        <div class="container mx-auto px-4 text-center">
          <h1 class="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
          <p class="mx-auto max-w-3xl text-xl md:text-2xl">
            We'd love to hear from you! Whether you have a question about our
            products, need help with an order, or want to provide feedback, our
            team is ready to assist you.
          </p>
        </div>
      </section>

      {/* <!-- Main Content --> */}
      <main class="container mx-auto max-w-7xl px-4 py-12">
        <div class="flex flex-col gap-8 lg:flex-row">
          {/* <!-- Contact Form --> */}
          <div class="rounded-lg bg-white p-8 shadow-lg lg:w-1/2">
            <h2 class="mb-6 text-2xl font-bold text-gray-800">
              Send us a message
            </h2>
            <form>
              <div class="mb-6">
                <label for="name" class="mb-2 block text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  class="input-focus w-full rounded-md border border-gray-300 px-4 py-2"
                  placeholder="John Doe"
                />
              </div>
              <div class="mb-6">
                <label for="email" class="mb-2 block text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  class="input-focus w-full rounded-md border border-gray-300 px-4 py-2"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div class="mb-6">
                <label for="subject" class="mb-2 block text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  class="input-focus w-full rounded-md border border-gray-300 px-4 py-2"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="returns">Returns & Refunds</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div class="mb-6">
                <label for="message" class="mb-2 block text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  class="input-focus w-full rounded-md border border-gray-300 px-4 py-2"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="w-full rounded-md bg-indigo-600 px-6 py-3 text-white transition duration-300 hover:bg-indigo-700 md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* <!-- Contact Info --> */}
          <div class="space-y-8 lg:w-1/2">
            {/* <!-- Contact Cards --> */}
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="card-hover rounded-lg bg-white p-6 shadow-md">
                <div class="mb-4 flex items-start">
                  <div class="mr-4 rounded-full bg-indigo-100 p-3">
                    <i class="fas fa-map-marker-alt text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="mb-2 font-bold text-gray-800">Our Location</h3>
                    <p class="text-gray-600">
                      123 Commerce Street
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-hover rounded-lg bg-white p-6 shadow-md">
                <div class="mb-4 flex items-start">
                  <div class="mr-4 rounded-full bg-indigo-100 p-3">
                    <i class="fas fa-phone-alt text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="mb-2 font-bold text-gray-800">Phone Support</h3>
                    <p class="text-gray-600">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri: 9AM-6PM PST
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-hover rounded-lg bg-white p-6 shadow-md">
                <div class="mb-4 flex items-start">
                  <div class="mr-4 rounded-full bg-indigo-100 p-3">
                    <i class="fas fa-envelope text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="mb-2 font-bold text-gray-800">Email</h3>
                    <p class="text-gray-600">
                      support@cartloop.com
                      <br />
                      help@cartloop.com
                    </p>
                  </div>
                </div>
              </div>
              <div class="card-hover rounded-lg bg-white p-6 shadow-md">
                <div class="mb-4 flex items-start">
                  <div class="mr-4 rounded-full bg-indigo-100 p-3">
                    <i class="fas fa-headset text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="mb-2 font-bold text-gray-800">Live Chat</h3>
                    <p class="text-gray-600">
                      Available 24/7
                      <br />
                      via our website
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Map --> */}
            <div class="overflow-hidden rounded-lg bg-white shadow-lg">
              <div class="p-4">
                <h3 class="mb-2 text-xl font-bold text-gray-800">
                  Find Us on Map
                </h3>
              </div>
              <div class="map-container max-h-72">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/77710bc8-62eb-446b-9401-1c130a0cf287.png"
                  alt="Map showing CartLoop headquarters location at 123 Commerce Street, San Francisco with map pins and highlighted route"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- FAQs Section --> */}
      <section class="bg-gray-100 py-12">
        <div class="container mx-auto px-4">
          <h2 class="mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>
          <div class="mx-auto max-w-4xl">
            <FAQSection />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
