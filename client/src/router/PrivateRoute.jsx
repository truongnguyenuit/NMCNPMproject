import { Navigate } from "react-router-dom";
const PrivateRoute = (props) => {
  const token = localStorage.getItem("accessToken");

  const { children } = props;

  if (!token) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default PrivateRoute;
