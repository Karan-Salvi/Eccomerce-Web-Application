import React, { useState } from 'react';
import {
  CreditCard,
  Plus,
  Edit2,
  Trash2,
  Check,
  Smartphone,
} from 'lucide-react';
import { useEcommerce } from '../../contexts/EcommerceContext';

const PaymentPage = () => {
  const {
    paymentMethods,
    addPaymentMethod,
    deletePaymentMethod,
    setDefaultPaymentMethod,
  } = useEcommerce();
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState('credit');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let newMethod;

    if (selectedType === 'credit') {
      const maskedCard = `**** **** **** ${formData.cardNumber.slice(-4)}`;
      newMethod = {
        type: 'credit',
        name: `${getCardType(
          formData.cardNumber
        )} ending in ${formData.cardNumber.slice(-4)}`,
        details: maskedCard,
        isDefault: paymentMethods.length === 0,
      };
    } else if (selectedType === 'paypal') {
      newMethod = {
        type: 'paypal',
        name: 'PayPal',
        details: formData.email,
        isDefault: paymentMethods.length === 0,
      };
    } else if (selectedType === 'apple') {
      newMethod = {
        type: 'apple',
        name: 'Apple Pay',
        details: 'Touch ID or Face ID',
        isDefault: paymentMethods.length === 0,
      };
    } else {
      newMethod = {
        type: 'google',
        name: 'Google Pay',
        details: 'Biometric authentication',
        isDefault: paymentMethods.length === 0,
      };
    }

    addPaymentMethod(newMethod);
    setShowForm(false);
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: '',
      email: '',
    });
  };

  const getCardType = (cardNumber) => {
    const firstDigit = cardNumber.charAt(0);
    if (firstDigit === '4') return 'Visa';
    if (firstDigit === '5') return 'Mastercard';
    if (firstDigit === '3') return 'American Express';
    return 'Card';
  };

  const getPaymentIcon = (type) => {
    switch (type) {
      case 'credit':
        return <CreditCard className="h-6 w-6" />;
      case 'paypal':
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
            P
          </div>
        );
      case 'apple':
        return <Smartphone className="h-6 w-6" />;
      case 'google':
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
            G
          </div>
        );
      default:
        return <CreditCard className="h-6 w-6" />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Payment Methods</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Payment Method
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            Add Payment Method
          </h2>

          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                {
                  type: 'credit',
                  label: 'Credit Card',
                  icon: <CreditCard className="h-6 w-6" />,
                },
                {
                  type: 'paypal',
                  label: 'PayPal',
                  icon: (
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-600 text-xs font-bold text-white">
                      P
                    </div>
                  ),
                },
                {
                  type: 'apple',
                  label: 'Apple Pay',
                  icon: <Smartphone className="h-6 w-6" />,
                },
                {
                  type: 'google',
                  label: 'Google Pay',
                  icon: (
                    <div className="flex h-6 w-6 items-center justify-center rounded bg-green-500 text-xs font-bold text-white">
                      G
                    </div>
                  ),
                },
              ].map((option) => (
                <button
                  key={option.type}
                  type="button"
                  onClick={() => setSelectedType(option.type)}
                  className={`flex cursor-pointer flex-col items-center space-y-2 rounded-lg border-2 p-4 transition-colors ${
                    selectedType === option.type
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.icon}
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {selectedType === 'credit' && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cardNumber: e.target.value.replace(/\s/g, ''),
                      })
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            )}

            {selectedType === 'paypal' && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  PayPal Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="user@example.com"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            )}

            {(selectedType === 'apple' || selectedType === 'google') && (
              <div className="py-8 text-center">
                <p className="mb-4 text-gray-600">
                  {selectedType === 'apple' ? 'Apple Pay' : 'Google Pay'} will
                  be set up using your device's secure authentication.
                </p>
                <p className="text-sm text-gray-500">
                  You'll be able to use{' '}
                  {selectedType === 'apple'
                    ? 'Touch ID, Face ID, or your device passcode'
                    : 'fingerprint, face unlock, or PIN'}{' '}
                  to complete payments.
                </p>
              </div>
            )}

            <div className="mt-6 flex space-x-4">
              <button
                type="submit"
                className="flex-1 cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Add Payment Method
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 cursor-pointer rounded-lg bg-gray-200 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center">
                {getPaymentIcon(method.type)}
                <div className="ml-3">
                  <span className="font-semibold text-gray-800">
                    {method.name}
                  </span>
                  {method.isDefault && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => deletePaymentMethod(method.id)}
                  className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 text-gray-600">
              <p>{method.details}</p>
            </div>

            {!method.isDefault && (
              <button
                onClick={() => setDefaultPaymentMethod(method.id)}
                className="flex cursor-pointer items-center font-medium text-blue-600 hover:text-blue-700"
              >
                <Check className="mr-1 h-4 w-4" />
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
