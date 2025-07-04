import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  Check,
  Smartphone,
} from "lucide-react";
import { useEcommerce } from "../../contexts/EcommerceContext";


const PaymentPage = () => {
  const {
    paymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
  } = useEcommerce();
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState  ("credit");
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newMethod;

    if (selectedType === "credit") {
      const maskedCard = `**** **** **** ${formData.cardNumber.slice(-4)}`;
      newMethod = {
        type: "credit",
        name: `${getCardType(
          formData.cardNumber
        )} ending in ${formData.cardNumber.slice(-4)}`,
        details: maskedCard,
        isDefault: paymentMethods.length === 0,
      };
    } else if (selectedType === "paypal") {
      newMethod = {
        type: "paypal",
        name: "PayPal",
        details: formData.email,
        isDefault: paymentMethods.length === 0,
      };
    } else if (selectedType === "apple") {
      newMethod = {
        type: "apple",
        name: "Apple Pay",
        details: "Touch ID or Face ID",
        isDefault: paymentMethods.length === 0,
      };
    } else {
      newMethod = {
        type: "google",
        name: "Google Pay",
        details: "Biometric authentication",
        isDefault: paymentMethods.length === 0,
      };
    }

    addPaymentMethod(newMethod);
    setShowForm(false);
    setFormData({
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: "",
      email: "",
    });
  };

  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === "4") return "Visa";
    if (firstDigit === "5") return "Mastercard";
    if (firstDigit === "3") return "American Express";
    return "Card";
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case "credit":
        return <CreditCard className="w-6 h-6" />;
      case "paypal":
        return (
          <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
            P
          </div>
        );
      case "apple":
        return <Smartphone className="w-6 h-6" />;
      case "google":
        return (
          <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">
            G
          </div>
        );
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Payment Methods</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Payment Method
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Add Payment Method
          </h2>

          <div className="mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  type: "credit",
                  label: "Credit Card",
                  icon: <CreditCard className="w-6 h-6" />,
                },
                {
                  type: "paypal",
                  label: "PayPal",
                  icon: (
                    <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      P
                    </div>
                  ),
                },
                {
                  type: "apple",
                  label: "Apple Pay",
                  icon: <Smartphone className="w-6 h-6" />,
                },
                {
                  type: "google",
                  label: "Google Pay",
                  icon: (
                    <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      G
                    </div>
                  ),
                },
              ].map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setSelectedType(option.type)}
                  className={`p-4 border-2 rounded-lg flex flex-col items-center space-y-2 transition-colors cursor-pointer ${
                    selectedType === option.type
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {selectedType === "credit" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={formData.cardholderName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardholderName: e.target.value,
                      })
                    }
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardNumber: e.target.value.replace(/\s/g, ""),
                      })
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) =>
                      setFormData({ ...formData, cvv: e.target.value })
                    }
                    placeholder="123"
                    maxLength={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {selectedType === "paypal" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PayPal Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="user@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            {(selectedType === "apple" || selectedType === "google") && (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  {selectedType === "apple" ? "Apple Pay" : "Google Pay"} will
                  be set up using your device's secure authentication.
                </p>
                <p className="text-sm text-gray-500">
                  You'll be able to use{" "}
                  {selectedType === "apple"
                    ? "Touch ID, Face ID, or your device passcode"
                    : "fingerprint, face unlock, or PIN"}{" "}
                  to complete payments.
                </p>
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Add Payment Method
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {getPaymentIcon(method.type)}
                <div className="ml-3">
                  <span className="font-semibold text-gray-800">
                    {method.name}
                  </span>
                  {method.isDefault && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-gray-600 mb-4">
              <p>{method.details}</p>
            </div>

            {!method.isDefault && (
              <button
                onClick={() => setDefaultPaymentMethod(method.id)}
                className="flex items-center text-blue-600 hover:text-blue-700 font-medium cursor-pointer"
              >
                <Check className="w-4 h-4 mr-1" />
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentPage;
