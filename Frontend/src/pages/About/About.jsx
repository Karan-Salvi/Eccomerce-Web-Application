<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us | TrendyCart</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            500: '#FF6B3D',
                            600: '#E05528',
                        }
                    }
                }
            }
        }
    </script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        .gradient-bg {
            background: linear-gradient(135deg, #FFF6F2 0%, #FFEEE5 100%);
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <span class="text-primary-600 font-bold text-xl">TrendyCart</span>
                </div>
                <div class="hidden md:flex space-x-8">
                    <a href="#" class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">Home</a>
                    <a href="#" class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">Categories</a>
                    <a href="#" class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">Deals</a>
                    <a href="#" class="text-primary-500 px-3 py-2 text-sm font-medium">About</a>
                    <a href="#" class="text-gray-700 hover:text-primary-500 px-3 py-2 text-sm font-medium">Contact</a>
                </div>
                <div class="flex items-center">
                    <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="gradient-bg py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="md:grid md:grid-cols-2 md:gap-8 items-center">
                <div class="mb-10 md:mb-0">
                    <h1 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Our Story
                    </h1>
                    <p class="mt-4 text-lg text-gray-600">
                        From humble beginnings to becoming the #1 trusted e-commerce platform - our journey to revolutionize online shopping.
                    </p>
                    <div class="mt-8 flex space-x-4">
                        <button class="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-md font-medium">
                            Start Shopping
                        </button>
                        <button class="border border-primary-500 text-primary-500 hover:bg-primary-50 px-6 py-3 rounded-md font-medium">
                            Watch Demo
                        </button>
                    </div>
                </div>
                <div>
                    <img src="https://placehold.co/800x500" alt="TrendyCart team celebrating in a modern office space with orange accents" class="rounded-lg shadow-xl">
                </div>
            </div>
        </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-3 gap-8 text-center">
                <div class="bg-gray-50 p-8 rounded-xl">
                    <h3 class="text-5xl font-bold text-primary-500">10M+</h3>
                    <p class="mt-2 text-gray-600 font-medium">Happy Customers</p>
                </div>
                <div class="bg-gray-50 p-8 rounded-xl">
                    <h3 class="text-5xl font-bold text-primary-500">50M+</h3>
                    <p class="mt-2 text-gray-600 font-medium">Products</p>
                </div>
                <div class="bg-gray-50 p-8 rounded-xl">
                    <h3 class="text-5xl font-bold text-primary-500">99.9%</h3>
                    <p class="mt-2 text-gray-600 font-medium">Satisfaction</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Mission Section -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900">Our Mission</h2>
                <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    To make quality products accessible to everyone with an enjoyable, convenient, and secure shopping experience.
                </p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Free Fast Delivery</h3>
                    <p class="text-gray-600">Free shipping on orders over 50 with express delivery available and real-time tracking.</p>
                </div>
                
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m-7 2a9 9 0 110-18 9 9 0 010 18z" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Secure Shopping</h3>
                    <p class="text-gray-600">Your data is protected with bank-level encryption and secure payment processing.</p>
                </div>
                
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <div class="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-3">Easy Returns</h3>
                    <p class="text-gray-600">30-day hassle-free returns with free return shipping on all orders.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Team Section -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900">Meet Our Team</h2>
                <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    The passionate individuals behind TrendyCart's success
                </p>
            </div>
            
            <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div class="text-center">
                    <img src="https://placehold.co/400x400" alt="Smiling female CEO wearing business casual attire in an orange-themed office" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                    <h3 class="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
                    <p class="text-primary-600">CEO & Founder</p>
                </div>
                
                <div class="text-center">
                    <img src="https://placehold.co/400x400" alt="Male tech executive wearing glasses standing against a orange accent wall" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                    <h3 class="text-lg font-semibold text-gray-900">Michael Chen</h3>
                    <p class="text-primary-600">CTO</p>
                </div>
                
                <div class="text-center">
                    <img src="https://placehold.co/400x400" alt="Female marketing director holding tablet with TrendyCart app open" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                    <h3 class="text-lg font-semibold text-gray-900">Emily Rodriguez</h3>
                    <p class="text-primary-600">Marketing Director</p>
                </div>
                
                <div class="text-center">
                    <img src="https://placehold.co/400x400" alt="Customer service manager smiling with headset on in modern office setting" class="w-32 h-32 rounded-full mx-auto mb-4 object-cover">
                    <h3 class="text-lg font-semibold text-gray-900">David Wilson</h3>
                    <p class="text-primary-600">Customer Experience</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
                <p class="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                    Don't just take our word for it - hear from our satisfied customers
                </p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0 mr-4">
                            <img src="https://placehold.co/80x80" alt="Happy female customer smiling in home environment with TrendyCart package" class="w-12 h-12 rounded-full">
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-900">Jennifer K.</h4>
                            <p class="text-primary-600 text-sm">Regular Customer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 italic">
                        "I've been shopping with TrendyCart for over two years now and have never been disappointed. The prices are unbeatable and their customer service is truly exceptional. My orders always arrive sooner than expected!"
                    </p>
                    <div class="mt-4 flex">
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="bg-white p-8 rounded-xl shadow-sm">
                    <div class="flex items-center mb-4">
                        <div class="flex-shrink-0 mr-4">
                            <img src="https://placehold.co/80x80" alt="Young male customer holding TrendyCart product box with enthusiastic expression" class="w-12 h-12 rounded-full">
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold text-gray-900">Robert T.</h4>
                            <p class="text-primary-600 text-sm">First-time Customer</p>
                        </div>
                    </div>
                    <p class="text-gray-600 italic">
                        "I was hesitant to order online at first, but TrendyCart made the process so simple and secure. When I had a question about my order, their support team responded within minutes. Will definitely be shopping here again!"
                    </p>
                    <div class="mt-4 flex">
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-500 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-bold mb-6">Ready to Experience TrendyCart?</h2>
            <p class="text-xl max-w-3xl mx-auto mb-8">
                Join over 10 million happy customers who shop smart and live better with TrendyCart.
            </p>
            <button class="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-md text-lg font-semibold">
                Start Shopping Now
            </button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-400 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">TrendyCart</h3>
                    <p class="text-sm">
                        Your trusted online destination for quality products at unbeatable prices. Shop with confidence and enjoy exceptional customer service.
                    </p>
                </div>
                
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white">About Us</a></li>
                        <li><a href="#" class="hover:text-white">Contact</a></li>
                        <li><a href="#" class="hover:text-white">FAQ</a></li>
                        <li><a href="#" class="hover:text-white">Shipping Info</a></li>
                        <li><a href="#" class="hover:text-white">Returns</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">Categories</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#" class="hover:text-white">Electronics</a></li>
                        <li><a href="#" class="hover:text-white">Fashion</a></li>
                        <li><a href="#" class="hover:text-white">Home & Garden</a></li>
                        <li><a href="#" class="hover:text-white">Sports</a></li>
                        <li><a href="#" class="hover:text-white">Books</a></li>
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-white text-lg font-semibold mb-4">Stay Connected</h3>
                    <p class="text-sm mb-4">
                        Subscribe to our newsletter for exclusive offers and updates.
                    </p>
                    <div class="flex">
                        <input type="email" placeholder="Enter your email" class="px-4 py-2 rounded-l-md text-gray-900 w-full focus:outline-none">
                        <button class="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-r-md">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-800 mt-12 pt-8 flex flex-col