import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../models/state";
import { ContactContext } from "../context/ContactContext";
const Card = (props: UserType) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(ContactContext);
  const { fname, lname, status } = props;
  const handleDelete = () => {
    dispatch({ type: "DELETE", payload: props });
  };
  const handleEdit = () => {
    dispatch({ type: "EDIT", payload: props });
    navigate("/createcontact");
  };
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-[240px] bg-white rounded-lg shadow-lg p-4 sm:mr-4 mb-4 sm:mb-0">
        <div className="card">
          <div className="card-top">
            <h1 className="text-2xl font-semibold mb-2">
              {fname} {lname}
            </h1>
            <p className="text-gray-600">Status - {status}</p>
          </div>
          <div className="flex mt-6 sm:mt-10 gap-3 sm:space-y-0 sm:space-x-2">
            <button
              className="bg-green-100 px-3 py-1 hover:bg-green-200 text-green-700 rounded sm:px-4 sm:py-2 border border-green-700 sm:w-auto"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="bg-red-100 hover:bg-red-200 text-red-700 rounded sm:px-4 sm:py-2 border border-red-700 sm:w-auto px-3 py-1"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    // <div className="flex">
    //   <div className="w-72 bg-white rounded-lg shadow-lg p-4">
    //     <div className="card">
    //       <div className="card-top">
    //         <h1 className="text-2xl font-semibold mb-2">
    //           {fname} {lname}
    //         </h1>
    //         <p className="text-gray-600">Status - {status}</p>
    //       </div>
    //       <div className=" flex gap-6 mt-10 space-x-2 ">
    //         <button
    //           className="card-btn bg-green-100 hover:bg-green-200 text-green-700 rounded px-4 py-2 border border-green-700"
    //           onClick={handleEdit}
    //         >
    //           Edit
    //         </button>
    //         <button
    //           className="card-btn bg-red-100 hover:bg-red-200 text-red-700 rounded px-4 py-2 border border-red-700"
    //           onClick={handleDelete}
    //         >
    //           Delete
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Card;
