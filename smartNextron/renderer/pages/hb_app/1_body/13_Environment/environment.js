import { useState } from "react";
import Button from "../../../hb_components/button";
import Delete from "../../../hb_components/delete_button";
import Edit from "../../../hb_components/edit_button";
import Save from "../../../hb_components/save_button";
import Cancel from "../../../hb_components/cancel_button";

const Environment = ({ data, setData }) => {
  const [newRow, setNewRow] = useState({ column1: "", column2: "" });
  const [editingRowId, setEditingRowId] = useState(null);

  const addRow = () => {
    setData([...data, { ...newRow, id: data.length + 1 }]);
    setNewRow({ column1: "", column2: "" });
  };

  const deleteRow = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const editRow = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    setNewRow({ ...rowToEdit });
    setEditingRowId(id);
  };

  const saveRow = (id) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          return { ...row, column1: newRow.column1, column2: newRow.column2 };
        }
        return row;
      })
    );
    setEditingRowId(null);
    setNewRow({ column1: "", column2: "" });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setNewRow({ column1: "", column2: "" });
  };

  const handleInputChange = (e, columnName) => {
    const value = e.target.value;
    setNewRow({ ...newRow, [columnName]: value });
  };

  const headers = ["Key", "Value", "Actions"];

  return (
    <div className="relative overflow-auto shadow-md sm:rounded-lg w-full h-[40vh]">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                scope="col"
                className="border border-gray-300 px-6 py-3 text-sky-600"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 py-2 px-5">
                  {editingRowId === row.id ? (
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded-md"
                      value={newRow.column1}
                      onChange={(e) => handleInputChange(e, "column1")}
                    />
                  ) : (
                    row.column1
                  )}
                </td>
                <td className="border border-gray-300 py-2 px-5">
                  {editingRowId === row.id ? (
                    <input
                      type="text"
                      className="p-1 border border-gray-300 rounded-md"
                      value={newRow.column2}
                      onChange={(e) => handleInputChange(e, "column2")}
                    />
                  ) : row.column2.length <= 20 ? (
                    row.column2
                  ) : (
                    row.column2.substring(0, 17) + "..."
                  )}
                </td>
                <td className="border border-gray-300 p-2">
                  {editingRowId === row.id ? (
                    <div className="ml-[10px] flex gap-3">
                      <Save onClick={() => saveRow(row.id)} />
                      <Cancel onClick={() => cancelEdit()} />
                    </div>
                  ) : (
                    <div className="ml-[10px] flex gap-3">
                      <Edit onClick={() => editRow(row.id)} />
                      <Delete onClick={() => deleteRow(row.id)} />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          {editingRowId === null && (
            <tr>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="key"
                  className="p-1 border border-gray-300 rounded-md"
                  value={newRow.column1}
                  onChange={(e) => handleInputChange(e, "column1")}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="value"
                  className="p-1 border border-gray-300 rounded-md"
                  value={newRow.column2}
                  onChange={(e) => handleInputChange(e, "column2")}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <Button type="primary_inverse" label="Add" onClick={addRow} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Environment;
