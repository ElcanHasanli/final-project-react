
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";


import toast from "react-hot-toast";

const DeleteModal = ({ setWantDelete, deleteProductId }) => {
  const dontWantDelete = (event) => {
    event.preventDefault();
    setWantDelete(false);
  };

  const wantDelete = async (event) => {
    event.preventDefault();

    await deleteDoc(doc(db, "products", deleteProductId));

    toast.success(`Item successfully deleted.`);

    setWantDelete(false);
  };

  return (
    <div className="flex justify-center fixed inset-0 backdrop-blur-xl z-10 items-center bg-[#1d1d1d4d] ">
      <div className="mx-0 h-fit w-1/3 bg-white roundedlg p-5 ">
        <div className="flex flex-col gap-5 items-center">
          <h2 className="text-center text-lg font-bold">
            Are you sure you want to remove this item?
          </h2>
          <div className="w-full justify-center flex gap-2">
            <button
              onClick={dontWantDelete}
              className="w-auto px-4 py-2 font-medium rounded-md duration-200 hover:bg-neutral-200 order-1"
            >
              No, keep it
            </button>
            <button
              onClick={wantDelete}
              className="w-auto px-4 py-2 font-medium rounded-md duration-200 bg-[#da4848e6] hover:bg-[#d54947] text-white  order-1"
            >
              Yes, remove it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
