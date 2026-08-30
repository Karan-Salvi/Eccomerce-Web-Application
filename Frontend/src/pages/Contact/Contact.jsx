import { useState } from 'react';
import {
  ChevronDown,
  Headset,
  Loader2,
  Mail,
  MapPin,
  MessageSquareText,
  Package,
  Phone,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Reveal } from '../../components/Home/Reveal';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useSendContactMessageMutation } from '../../store/api/contactApi';

const SUBJECTS = [
  { value: 'general', label: 'General', icon: MessageSquareText },
  { value: 'order', label: 'Order support', icon: Package },
  { value: 'returns', label: 'Returns & refunds', icon: Package },
  { value: 'feedback', label: 'Feedback', icon: Sparkles },
  { value: 'other', label: 'Something else', icon: MessageSquareText },
];

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
  {
    question: 'Can I change or cancel an order?',
    answer:
      "If your order hasn't shipped yet, contact us right away and we'll do our best to change or cancel it. Once it ships, you'll need to use our returns process.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit and debit cards, along with the standard digital wallets your browser or device already supports.',
  },
];

const EMPTY_FORM = { name: '', email: '', subject: '', message: '' };

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-zinc-200">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-zinc-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && <p className="mt-3 text-zinc-600">{answer}</p>}
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

    if (!form.subject) {
      toast.error('Pick a subject so we can route your message correctly.');
      return;
    }

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

      {/* Hero: asymmetric, left-set, no centered block */}
      <section className="border-b border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <Reveal className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
              How can we help?
            </h1>
            <p className="mt-4 text-lg text-zinc-600">
              Pick what this is about, tell us what's going on, and a real person on our team
              will get back to you, usually within one business day.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Form as the page's centerpiece, channels as a slim rail */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label>What's this about?</Label>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map(({ value, label, icon: Icon }) => {
                    const isSelected = form.subject === value;
                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setForm((prev) => ({ ...prev, subject: value }))}
                        aria-pressed={isSelected}
                        className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                          isSelected
                            ? 'border-amber-600 bg-amber-600 text-white'
                            : 'border-zinc-300 text-zinc-700 hover:border-zinc-400'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

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
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  rows={6}
                  required
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={handleChange('message')}
                  className="border-input flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-full bg-zinc-900 px-8 py-2.5 font-semibold text-white hover:bg-zinc-800"
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
              </div>
            </form>
          </Reveal>

          {/* Channels rail */}
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="divide-y divide-zinc-200 rounded-2xl bg-zinc-50 ring-1 ring-zinc-200">
              {CONTACT_ROWS.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-white text-amber-600 ring-1 ring-zinc-200">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{title}</p>
                    <p className="text-sm text-zinc-500">
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
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQs: two-column bento instead of a single long list */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-10 max-w-xl">
            <h2 className="text-3xl font-bold text-zinc-900">Frequently asked questions</h2>
            <p className="mt-2 text-zinc-600">Can't find what you're looking for? Send us a message above.</p>
          </Reveal>
          <Reveal delay={0.1} className="grid items-start gap-4 sm:grid-cols-2">
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
