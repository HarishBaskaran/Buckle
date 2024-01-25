import { useState } from "react";
import Button from "../../../hb_components/button";
import Delete from "../../../hb_components/delete_button";
import Edit from "../../../hb_components/edit_button";
import Save from "../../../hb_components/save_button";
import Cancel from "../../../hb_components/cancel_button";
import Dropdown from "../../../hb_components/dropdown_single";
import { authorizationOptions } from "../data/authorization_schema";
import axios from "axios";

const Authorization = ({ data, setData }) => {
  const [options, setOptions] = useState(authorizationOptions);

  const [newRow, setNewRow] = useState({
    column1: "",
    column2: "",
    column3: "",
  });
  const [editingRowId, setEditingRowId] = useState(null);

  const addRow = () => {
    setData([...data, { ...newRow, id: data.length + 1 }]);
    setNewRow({ column1: "", column2: "", column3: "" });
  };

  const deleteRow = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  const editRow = (id) => {
    const rowToEdit = data.find((row) => row.id === id);

    options = authorizationOptions.map((item) => {
      if (item.label === rowToEdit["column3"]) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return { ...item, selected: false };
      }
    });
    setOptions(options);
    setNewRow({ ...rowToEdit });
    setEditingRowId(id);
  };

  const saveRow = (id) => {
    setData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            column1: newRow.column1,
            column2: newRow.column2,
            column3: newRow.column3,
          };
        }
        return row;
      })
    );
    setEditingRowId(null);
    setNewRow({ column1: "", column2: "", column3: "" });
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setNewRow({ column1: "", column2: "", column3: "" });
  };

  const handleInputChange = (e, columnName) => {
    const value = e.target.value;
    setNewRow({ ...newRow, [columnName]: value });
  };

  const handleValueChange = (selected) => {
    selected.map((selected_date) => {
      if (selected_date.selected) {
        setNewRow({ ...newRow, ["column3"]: selected_date.label });
      }
    });
  };

  const endpoint = "http://localhost:8082/authorizationRunner";

  const authorizationRunner = async (data) => {
    try {
      const response = await axios.post(endpoint, data, {
        metadata: {
          name: "createEnvironment",
        },
      });
      console.log("CREATED authorizationRunner");
    } catch (error) {
      console.error("CREATE - Error creating authorizationRunner:", error);
    }
  };

  const handleAuthorize = (id) => {
    const rowToEdit = data.find((row) => row.id === id);
    authorizationRunner(rowToEdit);
  };

  const headers = ["Username", "Password", "Environment", "Actions"];

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
                  ) : (
                    row.column2
                  )}
                </td>
                <td className="border border-gray-300 py-2 px-5">
                  {editingRowId === row.id ? (
                    <Dropdown
                      options={options}
                      text="text-[12px]"
                      width="w-[230px]"
                      onChange={handleValueChange}
                    />
                  ) : (
                    row.column3
                  )}
                </td>
                <td className="border border-gray-300 py-2 mx-5">
                  {editingRowId === row.id ? (
                    <div className="ml-[10px] flex gap-3">
                      <Save onClick={() => saveRow(row.id)} />
                      <Cancel onClick={() => cancelEdit()} />
                    </div>
                  ) : (
                    <div className="ml-[10px] flex gap-3">
                      <Button
                        type="primary_inverse"
                        label="Authorize"
                        onClick={() => handleAuthorize(row.id)}
                      />
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
                  placeholder="username"
                  className="p-1 border border-gray-300 rounded-md"
                  value={newRow.column1}
                  onChange={(e) => handleInputChange(e, "column1")}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  placeholder="password"
                  className="p-1 border border-gray-300 rounded-md"
                  value={newRow.column2}
                  onChange={(e) => handleInputChange(e, "column2")}
                />
              </td>
              <td className="border border-gray-300 p-2">
                <Dropdown
                  options={authorizationOptions}
                  text="text-[12px]"
                  width="w-[230px]"
                  onChange={handleValueChange}
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

export default Authorization;
