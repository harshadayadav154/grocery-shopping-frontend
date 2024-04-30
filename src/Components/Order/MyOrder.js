import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Importing from Redux slices
import { selectIsAuthenticated, selectUser } from "../../redux/UserSlice";
import { fetchOrders } from "../../redux/OrderSlice";

function MyOrders() {
  // state variables
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log("HEre", isAuthenticated, user);
    // Check if the user is authenticated
    if (isAuthenticated && user) {
      console.log("email", user.email);
      dispatch(fetchOrders(user.email));
    }
  }, [isAuthenticated, dispatch, user]);
  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-2xl mt-4 font-semibold mb-4 text-center">
            Order
          </h1>
        </div>
      ) : (
        <div>User not available</div>
      )}
    </div>
  );
}

export default MyOrders;
