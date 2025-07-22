import React from "react";
import Navbar from "../../components/Home/Navbar";
import Footer from "../../components/Home/Footer";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <button
        className="w-full text-left p-6 flex justify-between items-center"
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
      question: "How can I track my order?",
      answer:
        "You can track your order by logging into your account and viewing the order details. You'll receive tracking information via email once your order ships.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We accept returns within 30 days of purchase. Items must be in original condition with all tags attached. Please contact our support team to initiate a return.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by destination. Please check our shipping information page for details.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "Our customer support team is available via phone, email, and live chat during business hours. You can find all contact options on this page.",
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
      <section class="bg-indigo-700 text-white py-16">
        <div class="container mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p class="text-xl md:text-2xl max-w-3xl mx-auto">
            We'd love to hear from you! Whether you have a question about our
            products, need help with an order, or want to provide feedback, our
            team is ready to assist you.
          </p>
        </div>
      </section>

      {/* <!-- Main Content --> */}
      <main class="container mx-auto px-4 py-12 max-w-7xl">
        <div class="flex flex-col lg:flex-row gap-8">
          {/* <!-- Contact Form --> */}
          <div class="lg:w-1/2 bg-white rounded-lg shadow-lg p-8">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">
              Send us a message
            </h2>
            <form>
              <div class="mb-6">
                <label for="name" class="block text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md input-focus"
                  placeholder="John Doe"
                />
              </div>
              <div class="mb-6">
                <label for="email" class="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md input-focus"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div class="mb-6">
                <label for="subject" class="block text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md input-focus"
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
                <label for="message" class="block text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  class="w-full px-4 py-2 border border-gray-300 rounded-md input-focus"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                class="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition duration-300 w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* <!-- Contact Info --> */}
          <div class="lg:w-1/2 space-y-8">
            {/* <!-- Contact Cards --> */}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white rounded-lg shadow-md p-6 card-hover">
                <div class="flex items-start mb-4">
                  <div class="bg-indigo-100 p-3 rounded-full mr-4">
                    <i class="fas fa-map-marker-alt text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 mb-2">Our Location</h3>
                    <p class="text-gray-600">
                      123 Commerce Street
                      <br />
                      San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 card-hover">
                <div class="flex items-start mb-4">
                  <div class="bg-indigo-100 p-3 rounded-full mr-4">
                    <i class="fas fa-phone-alt text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 mb-2">Phone Support</h3>
                    <p class="text-gray-600">
                      +1 (555) 123-4567
                      <br />
                      Mon-Fri: 9AM-6PM PST
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 card-hover">
                <div class="flex items-start mb-4">
                  <div class="bg-indigo-100 p-3 rounded-full mr-4">
                    <i class="fas fa-envelope text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 mb-2">Email</h3>
                    <p class="text-gray-600">
                      support@cartloop.com
                      <br />
                      help@cartloop.com
                    </p>
                  </div>
                </div>
              </div>
              <div class="bg-white rounded-lg shadow-md p-6 card-hover">
                <div class="flex items-start mb-4">
                  <div class="bg-indigo-100 p-3 rounded-full mr-4">
                    <i class="fas fa-headset text-indigo-600"></i>
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-800 mb-2">Live Chat</h3>
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
            <div class="bg-white rounded-lg shadow-lg overflow-hidden">
              <div class="p-4">
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                  Find Us on Map
                </h3>
              </div>
              <div class="map-container max-h-72">
                <img
                  src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/77710bc8-62eb-446b-9401-1c130a0cf287.png"
                  alt="Map showing CartLoop headquarters location at 123 Commerce Street, San Francisco with map pins and highlighted route"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* <!-- FAQs Section --> */}
      <section class="bg-gray-100 py-12">
        <div class="container mx-auto px-4">
          <h2 class="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div class="max-w-4xl mx-auto">
            <FAQSection />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
