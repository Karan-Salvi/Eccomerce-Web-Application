import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  User,
  ArrowRight,
  Star,
  Truck,
  Shield,
  RefreshCw,
  Heart,
  ChevronLeft,
  ChevronRight,
  Play,
  TrendingUp,
  Award,
} from "lucide-react";
import Footer from "../../components/Home/Footer";
import Newsletter from "../../components/Home/Newsletter";
import Testimonial from "../../components/Home/Testimonial";
import FeatureSection from "../../components/Home/FeatureSection";
import FeatureProducts from "../../components/Home/FeatureProducts";
import Category from "../../components/Home/Category";
import Hero from "../../components/Home/Hero";
import Navbar from "../../components/Home/Navbar";
import { useSelector } from "react-redux";

function Home() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log("user : ", user);
  console.log("isAuthenticated : ", isAuthenticated);
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Navbar />

      {/* Modern Hero Section */}
      <Hero />

      {/* Categories Section */}
      <Category />

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
