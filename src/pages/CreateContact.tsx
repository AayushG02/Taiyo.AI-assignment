import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { UserType } from "../models/state";
import { ContactContext } from "../context/ContactContext";

const CreateContact = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(ContactContext);
  const { editContact } = state;
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const radioOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ];

  useEffect(() => {
    if (editContact) {
      setFname(editContact.fname as string);
      setLname(editContact.lname as string);
      setStatus(editContact.status as string);
    }
  }, [editContact]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default behaviour on submission that is refresh

    // validation
    const newEmptyFields: string[] = [];
    if (fname === "") {
      newEmptyFields.push("fname");
    }
    if (lname === "") {
      newEmptyFields.push("lname");
    }
    if (status === "") {
      newEmptyFields.push("status");
    }
    if (newEmptyFields.length > 0) {
      setEmptyFields(newEmptyFields);
      return;
    }

    const user: UserType = {
      id: editContact ? editContact.id : uuid(),
      fname,
      lname,
      status,
    };
    editContact
      ? dispatch({ type: "EDIT_SAVE", payload: user })
      : dispatch({ type: "CREATE", payload: user });

    // reset the form
    setFname("");
    setLname("");
    setStatus("");
    navigate("/");
    setEmptyFields([]);
  };

  return (
    <div className="flex-1 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-md shadow-lg sm:p-6 p-2">
        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label
              htmlFor="fname"
              className="text-md font-medium text-gray-700"
            >
              First Name:
            </label>
            <input
              type="text"
              name="fname"
              id="fname"
              value={fname}
              onChange={(e) => {
                setFname(e.target.value);
              }}
              className={`${
                emptyFields.includes("fname")
                  ? "border border-red-500"
                  : "border"
              } mt-1 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none h-10 p-3`}
            />
          </div>
          <div>
            <label
              htmlFor="lname"
              className="text-md font-medium text-gray-700"
            >
              Last Name:
            </label>
            <input
              type="text"
              name="lname"
              id="lname"
              value={lname}
              onChange={(e) => {
                setLname(e.target.value);
              }}
              className={`${
                emptyFields.includes("lname")
                  ? "border border-red-500"
                  : "border"
              } mt-1 w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none h-10 p-3`}
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-md font-medium text-gray-700"
            >
              Status
            </label>
            <div className="mt-1 space-y-2 mb-7">
              {radioOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={() => setStatus(option.value)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          {emptyFields.length !== 0 && (
            <div className="p-2 w-full border border-red-700 text-red-700 bg-red-100">
              Enter all fields!
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-700 rounded px-4 py-2 focus:outline-none"
          >
            {editContact ? "Save" : "Submit"}
          </button>
        </form>
      </div>
    </div>

    // <div className="flex-1 flex justify-center items-center h-screen">
    //   <div className="w-96 bg-white rounded-md shadow-lg p-6">
    //     <form onSubmit={handleSubmit} className="space-y-7">
    //       <div>
    //         <label
    //           htmlFor="fname"
    //           className="text-md font-medium text-gray-700"
    //         >
    //           First Name:
    //         </label>
    //         <input
    //           type="text"
    //           name="fname"
    //           id="fname"
    //           value={fname}
    //           onChange={(e) => {
    //             setFname(e.target.value);
    //           }}
    //           className={` ${
    //             emptyFields.includes("fname") ? "border border-red-500" : "none"
    //           } mt-1  w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none h-10 p-3 emptyFields`}
    //         />
    //       </div>
    //       <div>
    //         <label
    //           htmlFor="lname"
    //           className=" text-md font-medium text-gray-700"
    //         >
    //           Last Name:
    //         </label>
    //         <input
    //           type="text"
    //           name="lname"
    //           id="lname"
    //           value={lname}
    //           onChange={(e) => {
    //             setLname(e.target.value);
    //           }}
    //           className={` ${
    //             emptyFields.includes("lname") ? "border border-red-500" : "none"
    //           } mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm focus:outline-none h-10 p-3`}
    //         />
    //       </div>
    //       <div>
    //         <label
    //           htmlFor="status"
    //           className="block text-md font-medium text-gray-700"
    //         >
    //           Status
    //         </label>
    //         <div className="mt-1 space-y-2 mb-7">
    //           {radioOptions.map((option) => (
    //             <label key={option.value} className="flex items-center">
    //               <input
    //                 type="radio"
    //                 name="status"
    //                 value={option.value}
    //                 checked={status === option.value}
    //                 onChange={() => setStatus(option.value)}
    //                 className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
    //               />
    //               <span className="ml-2 text-sm text-gray-600">
    //                 {option.label}
    //               </span>
    //             </label>
    //           ))}
    //         </div>
    //       </div>
    //       {emptyFields.length !== 0 ? (
    //         <div className=" p-2 w-full border border-red-700 text-red-700 bg-red-100 h-10">
    //           Enter all fields!
    //         </div>
    //       ) : undefined}
    //       <button
    //         type="submit"
    //         className="bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-700 rounded px-4 py-2 focus:outline-none"
    //       >
    //         {editContact ? "Save" : "Submit"}
    //       </button>
    //     </form>
    //   </div>
    // </div>
  );
};

export default CreateContact;
