import React, { useState } from "react";

const RadioGroup = ({ items, name, onItemSelected }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedItem(value);
    onItemSelected(value);
  };

  return (
    <ul className="w-48 text-sm font-medium text-gray-900 bg-white flex ">
      {items?.map((item, index) => (
        <li
          key={index}
          className={`w-full ${
            index === 0 ? "rounded-t-lg" : ""
          } dark:border-gray-600`}
        >
          <div className="flex items-center pl-3 w-full">
            <input
              id={`list-radio-${item.id}`}
              type="radio"
              value={item.value}
              name={name}
              checked={selectedItem === item.value}
              onChange={handleRadioChange}
              className="w-4 h-4 text-sky-600 bg-gray-100 focus:ring-sky-500 focus:ring-2 accent-sky-600"
            />
            <label
              htmlFor={`list-radio-${item.id}`}
              className="py-3 ml-2 text-sm font-medium text-gray-500 w-[150px]"
            >
              {item.label}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RadioGroup;
