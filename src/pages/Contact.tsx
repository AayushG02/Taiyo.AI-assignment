import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";
import Card from "../components/Card";
const Contact = () => {
  const { state } = useContext(ContactContext);
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className="flex-1 py-7 px-5 md:p-10 md:ml-8 lg:ml-16">
      <div>
        <Link
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 px-4 rounded border border-blue-700"
          to="/createcontact"
        >
          Create Contact
        </Link>
        <div className="flex gap-8 mt-10 flex-wrap">
          {state.users.length === 0 ? (
            <div className=" bg-yellow-50 text-orange-700 py-2 px-4 rounded border border-orange-700">
              No Contacts Found. Please add contacts from the create contact
              button.
            </div>
          ) : (
            state.users.map((user) => (
              <Card key={user.id as string} {...user} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
