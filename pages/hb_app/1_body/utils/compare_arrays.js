export const compareArrays = (arr1, arr2) => {
  const deleted = [];
  const added = [];

  arr1.forEach((obj1) => {
    const obj2 = arr2.find((o) => o.label === obj1.label); // Check if object exists in arr2
    if (!obj2) {
      deleted.push(obj1); // Object was deleted
    }
  });

  arr2.forEach((obj2) => {
    const obj1 = arr1.find((o) => o.label === obj2.label); // Check if object exists in arr1
    if (!obj1) {
      added.push(obj2); // Object was added
    }
  });

  return { deleted, added };
};

const compare_arrays_default = () => {};
export default compare_arrays_default;
