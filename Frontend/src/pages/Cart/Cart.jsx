import React from "react";
import {
  EcommerceProvider,
  useEcommerce,
} from "../../contexts/EcommerceContext";
import Navigation from "../../components/Cart/Navigation";
import CartPage from "../../components/Cart/CartPage";
import WishlistPage from "../../components/Cart/WishlistPage";
import AddressesPage from "../../components/Cart/AddressesPage";
import PaymentPage from "../../components/Cart/PaymentPage";

const AppContent = () => {
  const { currentPage } = useEcommerce();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "cart":
        return <CartPage />;
      case "wishlist":
        return <WishlistPage />;
      case "addresses":
        return <AddressesPage />;
      case "payment":
        return <PaymentPage />;
      default:
        return <CartPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>{renderCurrentPage()}</main>
    </div>
  );
};

function Cart() {
  return (
    <EcommerceProvider>
      <AppContent />
    </EcommerceProvider>
  );
}

export default Cart;
