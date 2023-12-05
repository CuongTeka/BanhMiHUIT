import { Route,Navigate, Routes } from "react-router-dom";
import { useAuth } from "../../authContext";


const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Routes>
      <Route {...rest} element={element} />
    </Routes>
  ) : (
    <Navigate to="/signin" replace />
  );
};

export default PrivateRoute;