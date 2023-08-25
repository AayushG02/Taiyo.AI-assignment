import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <h1 className="mb-6 text-6xl text-bold">Page not found!</h1>
      <Link className="underline text-blue-400" to="/">
        {" "}
        Redirect to home
      </Link>
    </div>
  );
};

export default NotFound;
