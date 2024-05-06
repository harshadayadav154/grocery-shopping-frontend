import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Importing from Redux slices
import { selectIsAuthenticated, selectUser } from "../../redux/UserSlice";
import { fetchOrders, selectOrders } from "../../redux/OrderSlice";

// Importing the components
import MyOrderCard from "../UI/MyOrderCard";

function MyOrders() {
  // state variables
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const orders = useSelector(selectOrders);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Check if the user is authenticated
    if (isAuthenticated && user) {
      dispatch(fetchOrders(user.email));
    }
  }, [isAuthenticated, dispatch, user]);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h1 className="text-2xl mt-4 font-semibold mb-4 text-center">
            My Orders
          </h1>
          {!orders.length && (
            <div className="text-center text-gray-500">
              Order not available.
            </div>
          )}
          {Object.values(orders).map((order) => {
            return <MyOrderCard key={order.id} order={order} />;
          })}
        </div>
      ) : (
        <div>User not available</div>
      )}
    </div>
  );
}

export default MyOrders;
