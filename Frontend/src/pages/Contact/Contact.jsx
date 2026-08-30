import { useState } from 'react';
import { ChevronDown, Headset, Loader2, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Reveal } from '../../components/Home/Reveal';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useSendContactMessageMutation } from '../../store/api/contactApi';

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: 'Our Location',
    lines: ['123 Commerce Street', 'San Francisco, CA 94103'],
  },
  {
    icon: Phone,
    title: 'Phone Support',
    lines: ['+1 (555) 123-4567', 'Mon-Fri: 9AM-6PM PST'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['support@cartloop.com', 'help@cartloop.com'],
  },
  {
    icon: Headset,
    title: 'Live Chat',
    lines: ['Available 24/7', 'via our website'],
  },
];

const FAQS = [
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

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 overflow-hidden rounded-2xl bg-white ring-1 ring-zinc-200">
      <button
        type="button"
        className="flex w-full items-center justify-between p-6 text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-zinc-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-zinc-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sendContactMessage, { isLoading }] = useSendContactMessageMutation();

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await sendContactMessage(form).unwrap();
      toast.success(response.message || "Thanks for reaching out. We'll get back to you soon.");
      setForm(EMPTY_FORM);
    } catch (error) {
      const fieldError = error?.data?.errors?.[0]?.message;
      toast.error(fieldError || error?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-zinc-900 py-16 text-white">
        <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="mx-auto text-lg text-zinc-300 md:text-xl">
            We'd love to hear from you. Whether you have a question about our products, need
            help with an order, or want to share feedback, our team is ready to help.
          </p>
        </Reveal>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact form */}
          <Reveal className="rounded-2xl bg-white p-8 ring-1 ring-zinc-200">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Full name</Label>
                <Input
                  id="contact-name"
                  required
                  placeholder="Jordan Patel"
                  value={form.name}
                  onChange={handleChange('name')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email">Email address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-subject">Subject</Label>
                <select
                  id="contact-subject"
                  required
                  value={form.subject}
                  onChange={handleChange('subject')}
                  className="border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="returns">Returns &amp; Refunds</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  rows={5}
                  required
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={handleChange('message')}
                  className="border-input flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-full bg-zinc-900 py-2.5 font-semibold text-white hover:bg-zinc-800 sm:w-auto sm:px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
            </form>
          </Reveal>

          {/* Contact info */}
          <Reveal delay={0.1} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {CONTACT_CARDS.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>
                <h3 className="mb-2 font-bold text-zinc-900">{title}</h3>
                <p className="text-zinc-600">
                  {lines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </main>

      {/* FAQs */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">
              Frequently Asked Questions
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            {FAQS.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
