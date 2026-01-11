import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

const Testimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      content:
        "Amazing shopping experience! Fast delivery and excellent customer service. I've been shopping here for over 2 years.",
      rating: 5,
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Michael Chen',
      role: 'Tech Enthusiast',
      content:
        "Best prices on electronics I've found anywhere. The product quality is outstanding and shipping is incredibly fast.",
      rating: 5,
      image:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Fashion Blogger',
      content:
        'Love the variety and style! The return policy is fantastic and customer support is always helpful and friendly.',
      rating: 5,
      image:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative">
          <div className="rounded-2xl bg-white p-8 text-center shadow-lg sm:p-12">
            <div className="mb-6 flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 fill-current text-yellow-400"
                />
              ))}
            </div>
            <blockquote className="mb-8 text-lg leading-relaxed text-gray-700 sm:text-xl">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="mr-4 h-12 w-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 -translate-x-6 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 translate-x-6 -translate-y-1/2 transform rounded-full bg-white p-3 shadow-lg transition-colors duration-200 hover:bg-gray-50"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-amber-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
