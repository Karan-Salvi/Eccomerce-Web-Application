import { ArrowRight, Star } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div;

const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-zinc-50">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pt-16 pb-20 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28 xl:px-8">
        {/* Text column */}
        <MotionDiv
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <h1 className="text-4xl leading-[1.05] font-extrabold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl">
            Everything you need,
            <br />
            nothing you don&apos;t pay extra for.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
            Electronics, fashion, home and more, from vendors we vet
            ourselves, delivered fast.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Start shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/products?category=Electronics"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-900 transition-colors hover:border-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Browse electronics
            </Link>
          </div>
        </MotionDiv>

        {/* Visual column: asymmetric tile arrangement */}
        <MotionDiv
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 gap-4 lg:col-span-6"
        >
          <div className="col-span-2 overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-zinc-200">
            <div className="grid grid-cols-5">
              <div className="col-span-3 aspect-[4/3] overflow-hidden bg-zinc-100">
                <img
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Wireless earbuds product shot"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-2 flex flex-col justify-center p-5">
                <p className="text-sm font-semibold text-zinc-900">
                  Wireless Earbuds Pro
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
                <p className="mt-2 text-lg font-bold text-zinc-900">₹159.99</p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-zinc-200">
            <div className="aspect-square overflow-hidden bg-zinc-100">
              <img
                src="https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Smart watch product shot"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-zinc-900">Smart Watch</p>
              <p className="mt-1 text-sm font-bold text-amber-600">₹249.99</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-zinc-200">
            <div className="aspect-square overflow-hidden bg-zinc-100">
              <img
                src="https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Backpack product shot"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm font-semibold text-zinc-900">Premium Backpack</p>
              <p className="mt-1 text-sm font-bold text-amber-600">₹89.99</p>
            </div>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
};

export default Hero;
