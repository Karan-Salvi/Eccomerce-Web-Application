import { RotateCcw, ShieldCheck, Star, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Reveal } from '../../components/Home/Reveal';

const STATS = [
  { value: '10M+', label: 'Happy Customers' },
  { value: '50M+', label: 'Products' },
  { value: '99.9%', label: 'Satisfaction' },
];

const MISSION_POINTS = [
  {
    icon: Truck,
    title: 'Free Fast Delivery',
    body: 'Free shipping on orders over 50 with express delivery available and real-time tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Shopping',
    body: 'Your data is protected with bank-level encryption and secure payment processing.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    body: '30-day hassle-free returns with free return shipping on all orders.',
  },
];

const TEAM = [
  { name: 'Karan Salvi', role: 'CEO & Founder', image: '/images/people1.jpg' },
  { name: 'Vedant Jamodakar', role: 'Co-Founder', image: '/images/people4.jpg' },
  { name: 'Vishwas Gore', role: 'CTO', image: '/images/people2.jpg' },
  { name: 'Kshitij Kadlag', role: 'CFO', image: '/images/people3.jpg' },
];

const TESTIMONIALS = [
  {
    name: 'Jennifer K.',
    role: 'Regular Customer',
    image: '/images/review1.jpg',
    quote:
      "I've been shopping with CartLoop for over two years now and have never been disappointed. The prices are unbeatable and their customer service is truly exceptional. My orders always arrive sooner than expected.",
  },
  {
    name: 'Robert T.',
    role: 'First-time Customer',
    image: '/images/review2.jpg',
    quote:
      'I was hesitant to order online at first, but CartLoop made the process so simple and secure. When I had a question about my order, their support team responded within minutes. Will definitely be shopping here again.',
  },
];

const About = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    toast.success("Thanks, we'll keep you posted.");
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-zinc-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            <Reveal>
              <h1 className="text-4xl leading-tight font-bold tracking-tight text-zinc-900 md:text-5xl">
                Our Story
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                From a modest start in a small workspace to becoming a trusted name in
                e-commerce, our journey has been fueled by passion, persistence, and people.
                We started with a single goal: simplify shopping and connect sellers to
                customers everywhere.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                With cutting-edge technology, a customer-first mindset, and a strong network
                of partners, we've worked to make online shopping seamless, reliable, and
                enjoyable.
              </p>
              <Link
                to="/products"
                className="mt-8 inline-block rounded-full bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-700"
              >
                Start Shopping
              </Link>
            </Reveal>
            <Reveal delay={0.1}>
              <img
                src="/images/about.jpg"
                alt="The CartLoop team collaborating around a desk in a bright, modern office"
                className="rounded-[20px] shadow-xl"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="grid gap-6 text-center sm:grid-cols-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-zinc-50 p-8">
                <p className="text-5xl font-bold text-amber-600">{stat.value}</p>
                <p className="mt-2 font-medium text-zinc-600">{stat.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Our Mission</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-zinc-600">
              To make quality products accessible to everyone with an enjoyable, convenient,
              and secure shopping experience.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-6 md:grid-cols-3">
            {MISSION_POINTS.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl bg-white p-8 ring-1 ring-zinc-200">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <Icon className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-zinc-900">{title}</h3>
                <p className="text-zinc-600">{body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-900">Meet Our Team</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-zinc-600">
              The passionate individuals behind <span className="brand_name">CartLoop</span>&rsquo;s success
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {TEAM.map((member) => (
              <div key={member.name} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto mb-4 h-32 w-32 rounded-full object-cover ring-4 ring-zinc-100"
                />
                <h3 className="text-lg font-semibold text-zinc-900">{member.name}</h3>
                <p className="text-amber-600">{member.role}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-zinc-900">What Our Customers Say</h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-zinc-600">
              Don&rsquo;t just take our word for it, hear from our satisfied customers
            </p>
          </Reveal>

          <Reveal delay={0.1} className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((review) => (
              <div key={review.name} className="rounded-2xl bg-white p-8 ring-1 ring-zinc-200">
                <div className="mb-4 flex items-center gap-4">
                  <img src={review.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <h4 className="text-lg font-semibold text-zinc-900">{review.name}</h4>
                    <p className="text-sm text-amber-600">{review.role}</p>
                  </div>
                </div>
                <p className="text-zinc-600 italic">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-4 flex gap-0.5" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="sr-only">5 out of 5 stars</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Stay Updated with Our Latest Deals
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-amber-100">
              Subscribe to our newsletter and be the first to know about exclusive offers,
              new arrivals, and special promotions.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Enter your email address"
                className="flex-1 rounded-full bg-white px-6 py-3.5 text-zinc-900 placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-zinc-900 px-8 py-3.5 font-semibold whitespace-nowrap text-white transition-colors hover:bg-zinc-800"
              >
                Subscribe
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
