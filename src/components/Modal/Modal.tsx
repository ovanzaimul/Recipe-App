import React from "react";

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onCloseModal }) => {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-md p-5 max-w-[600px] w-2/3">
      <button
        onClick={onCloseModal}
        className="text-4xl absolute top-0 right-2"
      >
        &times;
      </button>
      <h3 className="text-2xl font-semibold mb-6">Add new Recipe</h3>
      {/* modal content */}
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <div className="flex justify-between items-center">
          <label htmlFor="name" className="basis-1/3">
            Name
          </label>
          <input
            id="name"
            placeholder="Input Recipe name..."
            className="flex-1 p-1 rounded-md pl-2"
          />
        </div>
        {/* Ingredients */}
        <h4 className="text-xl font-semibold mt-1">Ingredients</h4>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="" className="basis-1/3">
            Ingredients 1
          </label>
          <input
            className="flex-1 p-1 rounded-md pl-2"
            type="text"
            placeholder="ingredient 1"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="" className="basis-1/3">
            Ingredients 2
          </label>
          <input
            className="flex-1 p-1 rounded-md pl-2"
            type="text"
            placeholder="ingredient 2"
          />
        </div>
        <button
          type="button"
          className="bg-sky-300 rounded-md self-center mt-2 px-2 py-1"
        >
          Add ingredient
        </button>

        {/* Instruction */}
        <h4 className="text-xl font-semibold mt-1">Instruction</h4>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="" className="basis-1/3">
            step 1
          </label>
          <input
            className="flex-1 p-1 rounded-md pl-2"
            type="text"
            placeholder="step 1"
          />
        </div>
        <div className="flex justify-between items-center">
          <label htmlFor="" className="basis-1/3">
            step 2
          </label>
          <input
            className="flex-1 p-1 rounded-md pl-2"
            type="text"
            placeholder="step 2"
          />
        </div>
        <button
          type="button"
          className="bg-sky-300 rounded-md self-center mt-2 px-2 py-1"
        >
          Add step
        </button>

        {/* Action Button */}
        <div className="flex gap-4 mt-6 [&>*]:rounded-md [&>*]:px-4 [&>*]:py-2">
          <button type="submit" className="bg-sky-300">
            Add
          </button>
          <button onClick={onCloseModal} className="bg-red-300">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
