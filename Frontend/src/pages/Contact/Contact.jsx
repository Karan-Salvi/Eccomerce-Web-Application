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

const CONTACT_ROWS = [
  {
    icon: MapPin,
    title: 'Our location',
    lines: ['123 Commerce Street', 'San Francisco, CA 94103'],
  },
  {
    icon: Phone,
    title: 'Phone support',
    lines: ['+1 (555) 123-4567', 'Mon-Fri: 9AM-6PM PST'],
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['support@cartloop.com', 'help@cartloop.com'],
  },
  {
    icon: Headset,
    title: 'Live chat',
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
    <div className="py-2">
      <button
        type="button"
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-zinc-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <p className="pb-4 pr-8 text-zinc-600">{answer}</p>}
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

      {/* Split hero: brand panel + form, mirrors the Login/Register language */}
      <section className="grid grid-cols-1 lg:grid-cols-5 lg:items-stretch">
        <div className="relative flex flex-col overflow-hidden bg-zinc-900 px-6 py-16 text-white sm:px-10 lg:col-span-2 lg:py-20">
          <span
            className="pointer-events-none absolute -bottom-16 -left-6 font-serif text-[220px] leading-none text-white/[0.05] select-none"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <Reveal className="relative">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Get in touch</h1>
            <p className="mt-4 max-w-sm text-lg text-zinc-300">
              Whether it's a question about your order, a product, or just feedback, our team
              reads every message.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-12 space-y-6 lg:mt-auto lg:pt-12">
            {CONTACT_ROWS.map(({ icon: Icon, title, lines }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-amber-500 ring-1 ring-white/10">
                  <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="text-sm text-zinc-400">
                    {lines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="bg-zinc-50 px-6 py-16 sm:px-10 lg:col-span-3 lg:py-20">
          <Reveal delay={0.15} className="mx-auto w-full max-w-xl rounded-2xl bg-white p-8 ring-1 ring-zinc-200 sm:p-10">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
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
              <p className="text-sm text-zinc-500">We typically reply within one business day.</p>
            </form>
          </Reveal>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-2 text-3xl font-bold text-zinc-900">Frequently asked questions</h2>
            <p className="mb-8 text-zinc-600">Can't find what you're looking for? Send us a message above.</p>
          </Reveal>
          <Reveal delay={0.1} className="divide-y divide-zinc-200 border-t border-zinc-200">
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
