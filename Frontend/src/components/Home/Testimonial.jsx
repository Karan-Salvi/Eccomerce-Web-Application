import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React from "react";
import { useState } from "react";

const Testimonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content:
        "Amazing shopping experience! Fast delivery and excellent customer service. I've been shopping here for over 2 years.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Michael Chen",
      role: "Tech Enthusiast",
      content:
        "Best prices on electronics I've found anywhere. The product quality is outstanding and shipping is incredibly fast.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
    },
    {
      name: "Emily Rodriguez",
      role: "Fashion Blogger",
      content:
        "Love the variety and style! The return policy is fantastic and customer support is always helpful and friendly.",
      rating: 5,
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400",
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Don't just take our word for it - hear from our satisfied customers
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-6 w-6 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <blockquote className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="flex items-center justify-center">
              <img
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {testimonials[currentTestimonial].name}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? "bg-amber-600" : "bg-gray-300"
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
