import { RefreshCw, Shield, Truck } from 'lucide-react';
import { Reveal } from './Reveal';

const reasons = [
  {
    icon: Truck,
    title: 'Free fast delivery',
    text: 'Free shipping on orders over ₹50, with express delivery and live tracking.',
  },
  {
    icon: Shield,
    title: 'Secure shopping',
    text: 'Bank-level encryption on every transaction, from browsing to checkout.',
  },
  {
    icon: RefreshCw,
    title: 'Easy returns',
    text: '30-day hassle-free returns with free return shipping on all orders.',
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Why shop with CartLoop
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 grid grid-cols-1 divide-y divide-zinc-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {reasons.map(({ icon: Icon, title, text }) => (
            <div key={title} className="py-8 first:pt-0 md:px-8 md:py-0 md:first:pl-0 md:last:pr-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                <Icon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-zinc-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-zinc-600">{text}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default FeatureSection;
