const DragDrop = () => {
  const handleDragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const itemId = event.dataTransfer.getData("text/plain");
    const item = document.getElementById(itemId);
    event.target.appendChild(item);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div
        className="w-64 h-64 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          id="item1"
          className="bg-gray-200 p-4 mb-4"
          draggable="true"
          onDragStart={handleDragStart}
        >
          Item 1
        </div>
        <div
          id="item2"
          className="bg-gray-200 p-4 mb-4"
          draggable="true"
          onDragStart={handleDragStart}
        >
          Item 2
        </div>
      </div>
    </div>
  );
};

export default DragDrop;
