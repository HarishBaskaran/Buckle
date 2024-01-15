import React from "react";

const ProductTable = ({ headers, data }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers?.map((header, index) => (
              <th key={index} scope="col" className="px-6 py-3 text-sky-600">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, index) => (
            <tr
              key={index}
              className={`bg-white ${
                index % 2 === 0 ? "dark:bg-gray-800" : "dark:bg-gray-700"
              } hover:bg-gray-50 dark:hover:bg-gray-600 border-solid border-b-2`}
            >
              {row.map((cell, index) => (
                <td key={index} className="px-6 py-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
