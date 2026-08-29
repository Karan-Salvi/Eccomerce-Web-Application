import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from './Reveal';

const MotionBlockquote = motion.blockquote;

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Regular customer',
    content:
      'Fast delivery, real customer service. I have been shopping here for two years and never had a bad order.',
    image:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Michael Chen',
    role: 'Tech enthusiast',
    content:
      'Best prices on electronics I have found anywhere. Product quality is consistently strong.',
    image:
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Fashion blogger',
    content:
      'Love the variety. The return policy is genuinely painless and support actually helps.',
    image:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[index];

  return (
    <section className="bg-zinc-50 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Reveal>
          <Quote className="mx-auto h-8 w-8 text-amber-500" />

          <div className="relative mt-6 min-h-[9rem] sm:min-h-[7rem]">
            <AnimatePresence mode="wait">
              <MotionBlockquote
                key={index}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl leading-relaxed font-medium text-zinc-900 sm:text-2xl"
              >
                &ldquo;{current.content}&rdquo;
              </MotionBlockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <img
              src={current.image}
              alt=""
              className="h-11 w-11 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-zinc-900">{current.name}</p>
              <p className="text-sm text-zinc-500">{current.role}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="rounded-full border border-zinc-300 p-2.5 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex gap-1.5">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial from ${t.name}`}
                  aria-current={i === index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-6 bg-amber-600' : 'w-1.5 bg-zinc-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="rounded-full border border-zinc-300 p-2.5 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Testimonial;
