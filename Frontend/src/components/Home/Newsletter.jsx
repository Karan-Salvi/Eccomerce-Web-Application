import { ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { LoopMark } from './LoopMark';
import { Reveal } from './Reveal';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Enter a valid email address');
      return;
    }
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="relative overflow-hidden bg-amber-600 py-20">
      <LoopMark className="pointer-events-none absolute top-1/2 -right-16 h-64 w-96 -translate-y-1/2 text-white/10 sm:-right-8" />

      <Reveal className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Deals worth knowing about
          </h2>
          <p className="mt-4 text-amber-50">
            New arrivals and price drops, sent when there is something worth
            sending.
          </p>

          {submitted ? (
            <p className="mt-8 font-semibold text-white">
              You&apos;re subscribed. Watch your inbox.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex max-w-md items-center gap-1.5 rounded-full bg-white p-1.5 shadow-lg"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex flex-shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-600 focus-visible:outline-none"
              >
                Subscribe
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
};

export default Newsletter;
