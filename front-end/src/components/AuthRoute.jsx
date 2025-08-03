import { useContext, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function AuthRoute({ children }) {
  const { user, loadingUser } = useContext(UserContext);
  const [showAlert, setShowAlert] = useState(false);
  const alertShown = useRef(false);

  useEffect(() => {
    if (!loadingUser && !user && !alertShown.current) {
      alert("Please login first");
      alertShown.current = true;
      setShowAlert(true);
    }
  }, [loadingUser, user]);

  if (loadingUser) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
