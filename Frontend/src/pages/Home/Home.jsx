import { Link } from 'react-router-dom';
import Footer from '../../components/Home/Footer';
import Newsletter from '../../components/Home/Newsletter';
import Testimonial from '../../components/Home/Testimonial';
import FeatureSection from '../../components/Home/FeatureSection';
import FeatureProducts from '../../components/Home/FeatureProducts';
import Category from '../../components/Home/Category';
import Hero from '../../components/Home/Hero';
import Navbar from '../../components/Home/Navbar';
import { Reveal } from '../../components/Home/Reveal';
import { useSelector } from 'react-redux';
import { useGetRecommendationsForMeQuery } from '../../store/api/recommendationApi';

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useGetRecommendationsForMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <div className="font-display min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <Navbar />

      {/* Modern Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Category />

      {/* Recommended for you (logged-in users) */}
      {isAuthenticated && !isLoadingRecommendations && recommendationsData?.data?.length > 0 && (
        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                Picked for you
              </h2>
              <p className="mt-3 max-w-md text-zinc-600">
                Based on what you have viewed and what others bought.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendationsData.data.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="group overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-zinc-200 transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:outline-none"
                >
                  <div className="aspect-square overflow-hidden bg-zinc-100">
                    <img
                      src={item.images?.[0]?.url}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="truncate text-sm font-medium text-zinc-900">{item.name}</p>
                    <p className="mt-1 text-sm font-bold text-zinc-900">₹{item.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <FeatureProducts />

      {/* Features Section */}
      <FeatureSection />

      {/* Testimonials */}
      <Testimonial />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
