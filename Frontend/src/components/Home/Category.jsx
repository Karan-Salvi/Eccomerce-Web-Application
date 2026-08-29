import { Link } from 'react-router-dom';
import { Reveal } from './Reveal';

const categories = [
  {
    name: 'Electronics',
    value: 'Electronics',
    image:
      'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1000',
    span: 'col-span-2 row-span-2',
  },
  {
    name: 'Fashion',
    value: 'Fashion',
    image:
      'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=700',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Home & Kitchen',
    value: 'Home & Kitchen',
    image:
      'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=700',
    span: 'col-span-1 row-span-1',
  },
  {
    name: 'Sports & Fitness',
    value: 'Sports & Fitness',
    image:
      'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=700',
    span: 'col-span-2 row-span-1',
  },
];

const Category = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="max-w-md text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
            Shop by category
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:grid-rows-2">
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/products?category=${encodeURIComponent(category.value)}`}
                className={`group relative block overflow-hidden rounded-[20px] bg-zinc-100 shadow-sm ring-1 ring-zinc-200 focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none ${category.span}`}
              >
                <div className="h-full min-h-[10rem] w-full">
                  <img
                    src={category.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/0 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-4 sm:p-5">
                  <h3 className="text-base font-bold text-white sm:text-lg">
                    {category.name}
                  </h3>
                  <span className="mt-1 inline-flex items-center text-sm text-white/80 transition-transform duration-300 group-hover:translate-x-1">
                    Shop now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Category;
