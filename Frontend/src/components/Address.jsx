import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { stepSliceActions } from "../store/stepSlice";

const Address = ({ selectedStep, setSelectedStep }) => {
  const dispatch = useDispatch();
  const stepList = useSelector((store) => store.stepList);
  const handleAddAddres = async () => {
    setSelectedStep(3);
    console.log(stepList);

    if (!stepList.includes(2)) {
      dispatch(stepSliceActions.AddStep(2));
    }
  };

  return (
    <>
      <form
        className={`w-full h-auto flex flex-col items-start gap-3 ${
          selectedStep !== 2 && "hidden"
        }`}
      >
        <div className="w-full h-auto">
          <label htmlFor="Name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="Name"
            id="Name"
            className="w-full rounded-md border-gray-300 p-4"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="w-full h-auto flex justify-between gap-5">
          <div className="w-full">
            <label htmlFor="Email">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="Email"
              id="Email"
              className="w-full rounded-md border-gray-300 p-4"
              placeholder="Enter you email"
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="Phone">
              Phone number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="Phone"
              id="Phone"
              className="w-full rounded-md border-gray-300 p-4"
              placeholder="Enter you phone number"
              required
            />
          </div>
        </div>

        <div class="w-full h-auto">
          <label htmlFor="countries">
            Country <span className="text-red-500">*</span>
          </label>

          <select
            id="countries"
            class="w-full rounded-md border-gray-300 p-4"
            required
          >
            <option selected value="IN">
              India
            </option>
            <option value="US">United States</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
        </div>

        <div className="w-full h-auto">
          <label htmlFor="address">
            Your address <span className="text-red-500">*</span>
          </label>
          <textarea
            name="address"
            id="address"
            placeholder="Enter full address"
            rows={3}
            className="w-full rounded-md border-gray-300 p-4"
            required
          ></textarea>
        </div>

        <div className="w-full h-8 ">
          <button
            className="w-auto flex items-center h-full px-7 bg-gray-600 py-2 text-white rounded-md hover:bg-gray-700"
            type="button"
            onClick={handleAddAddres}
          >
            Add Address
          </button>
        </div>
      </form>
    </>
  );
};

export default Address;
