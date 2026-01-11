import React from 'react';

const Category = () => {
  const categories = [
    {
      name: 'Electronics',
      image:
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '2,500+ items',
    },
    {
      name: 'Fashion',
      image:
        'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '3,200+ items',
    },
    {
      name: 'Home & Garden',
      image:
        'https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '1,800+ items',
    },
    {
      name: 'Sports',
      image:
        'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '950+ items',
    },
  ];
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Explore our diverse range of products across multiple categories
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative transform overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                <h3 className="mb-2 text-xl font-bold">{category.name}</h3>
                <p className="text-sm text-gray-200">{category.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
