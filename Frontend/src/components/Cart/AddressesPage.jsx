import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, Check } from 'lucide-react';
import { useEcommerce } from '../../contexts/EcommerceContext';

const AddressesPage = () => {
  const {
    addresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  } = useEcommerce();
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    isDefault: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingAddress) {
      updateAddress({ ...editingAddress, ...formData });
      setEditingAddress(null);
    } else {
      addAddress(formData);
    }

    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false,
    });
    setShowForm(false);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingAddress(null);
    setFormData({
      name: '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      isDefault: false,
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Delivery Addresses</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex cursor-pointer items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          {/* <p className="hidden group-hover:block duration-1000 transition-all absolute  top-0 left-1/2 right-1/2  text-nowrap transform translate-0.5 text-black">Add Address</p> */}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 rounded-sm border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-gray-800">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Address Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Home, Work, Office"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Street Address
              </label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) =>
                  setFormData({ ...formData, street: e.target.value })
                }
                placeholder="123 Main Street"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="New York"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                placeholder="NY"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) =>
                  setFormData({ ...formData, zipCode: e.target.value })
                }
                placeholder="10001"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
              </select>
            </div>

            <div className="flex items-center md:col-span-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={formData.isDefault}
                onChange={(e) =>
                  setFormData({ ...formData, isDefault: e.target.checked })
                }
                className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isDefault" className="ml-2 text-sm text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex space-x-4 md:col-span-2">
              <button
                type="submit"
                className="flex-1 cursor-pointer rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {editingAddress ? 'Update Address' : 'Save Address'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 cursor-pointer rounded-lg bg-gray-200 py-3 font-semibold text-gray-800 transition-colors hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-sm border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                <span className="font-semibold text-gray-800">
                  {address.name}
                </span>
                {address.isDefault && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    Default
                  </span>
                )}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => deleteAddress(address.id)}
                  className="cursor-pointer rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="mb-4 text-gray-600">
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
            </div>

            {!address.isDefault && (
              <button
                onClick={() => setDefaultAddress(address.id)}
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

export default AddressesPage;
