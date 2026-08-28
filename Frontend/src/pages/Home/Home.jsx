import Footer from '../../components/Home/Footer';
import Newsletter from '../../components/Home/Newsletter';
import Testimonial from '../../components/Home/Testimonial';
import FeatureSection from '../../components/Home/FeatureSection';
import FeatureProducts from '../../components/Home/FeatureProducts';
import Category from '../../components/Home/Category';
import Hero from '../../components/Home/Hero';
import Navbar from '../../components/Home/Navbar';
import { useSelector } from 'react-redux';
import { useGetRecommendationsForMeQuery } from '../../store/api/recommendationApi';

function Home() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { data: recommendationsData, isLoading: isLoadingRecommendations } = useGetRecommendationsForMeQuery(undefined, {
    skip: !isAuthenticated,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Modern Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Category />

      {/* Recommended for you (logged-in users) */}
      {isAuthenticated && !isLoadingRecommendations && recommendationsData?.data?.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Recommended for you
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Picked specially for you based on what you've viewed and what others bought.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommendationsData.data.map((item) => (
              <a
                key={item._id}
                href={`/product/${item._id}`}
                className="group overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={item.images?.[0]?.url}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm font-bold text-gray-900">₹{item.price.toFixed(2)}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
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
