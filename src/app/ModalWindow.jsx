const Modal = ({ closeModal, errorMessage }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg">
        <p className="text-lg font-semibold">
          {errorMessage ? errorMessage : "Image Upload Success"}
        </p>
        {errorMessage && (
          <p className="text-sm text-red-500 mt-2 hidden">{errorMessage}</p>
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
